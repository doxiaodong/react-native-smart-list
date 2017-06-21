import React, { Component } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import store from '../store'

import globalStyle from '../style'
import defaultStyle from './style'

export default class Tabs extends Component<{
  maxLabelLength?: number
}, {}> {

  state = {
    currentName: null,
    layout: { y: 0 }
  }

  componentDidMount() {
    store.$watch('currentName', (next) => {
      if (next === this.state.currentName) {
        return
      }
      this.setState({
        currentName: next
      })
    })
  }

  componentWillUnmount() {
    store.$unwatch('currentName')
  }

  isSomeoneActive() {
    return this.state.currentName != null
  }

  isActive(name, label) {
    if (name === undefined) {
      name = label
    }
    return this.state.currentName === name
  }

  handleTabClick(tab) {
    const { name, label } = tab.props
    const realName = name == null ? label : name
    let nextName = null
    if (this.state.currentName !== realName) {
      nextName = realName
    }
    store.setName(nextName)
  }

  onLayout = (e) => {
    this.setState({ layout: e.nativeEvent.layout })
  }

  shadowLabel(label, max) {
    if (!max) {
      max = 4
    }
    if (label.length > max) {
      return label.slice(0, max) + '...'
    }
    return label
  }

  tabsLayout = () => {
    const { children, maxLabelLength } = this.props
    const style = { ...defaultStyle, ...globalStyle.tabs }
    return (
      <View style={style.tabs}>
        {
          React.Children.map(children, (item, index) => {
            const { name, label, selectedLabel } = item['props']
            const isFirst = index === 0
            const isActive = this.isActive(name, label)
            return (
              <View key={index} style={[style.tab, !isFirst && style.tabIsNotFirst]}>
                <TouchableOpacity
                  style={style.tabContainer}
                  onPress={() => this.handleTabClick(item)}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[style.text, isActive && style.activeText]}>
                      {this.shadowLabel(selectedLabel || label, maxLabelLength)}
                    </Text>
                    <Icon
                      name={isActive ? 'angle-up' : 'angle-down'}
                      style={isActive && style.activeIcon}
                      size={16}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    )
  }

  render() {
    const { children } = this.props
    const style = { ...defaultStyle, ...globalStyle.tabs }
    const modalViewStyle = {
      top: this.state.layout.y
    }
    return (
      <View style={style.container}>
        {this.tabsLayout()}
        <View onLayout={this.onLayout}>
          <Modal transparent={true} onRequestClose={() => null} visible={this.isSomeoneActive()}>
            <View style={modalViewStyle}>
              <View>
                {this.tabsLayout()}
              </View>
              {React.Children.map(children, (item) => {
                const { name, label } = item['props']
                return this.isActive(name, label) &&
                  <View style={style.tabContentContainer} onTouchEnd={() => this.handleTabClick(item)}>
                    <View onTouchEnd={(e) => { e.stopPropagation() }} style={style.tabContent}>
                      {item}
                    </View>
                  </View>
              })}
            </View>
          </Modal>
        </View>
      </View>
    )
  }
}
