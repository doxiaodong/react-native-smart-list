import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import store from '../store'
import AndroidPaneContainer from './AndroidPaneContainer'
import IOSPaneContainer from './IOSPaneContainer'

import globalStyle from '../style'
import defaultStyle from './style'

const isIOS = Platform.OS === 'ios'

export default class Tabs extends Component<{
  maxLabelLength?: number
}, {}> {

  state = {
    currentName: null
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

  shadowLabel(label, max) {
    if (!max) {
      max = 4
    }
    if (label.length > max) {
      return label.slice(0, max) + '...'
    }
    return label
  }

  tabsLayout = (style) => {
    const { children, maxLabelLength } = this.props
    return (
      <View style={style.tabs}>
        {
          React.Children.map(children, (item, index) => {
            const { name, label, selectedLabel } = item['props']
            const isFirst = index === 0
            const isActive = this.isActive(name, label)
            return (
              <View key={index} style={[style.tab, style.activeTab, !isFirst && style.tabIsNotFirst]}>
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

    const containerChildren = React.Children.map(children, (item) => {
      const { name, label } = item['props']
      return this.isActive(name, label) && (
        <View style={style.tabContentContainer} onTouchEnd={() => this.handleTabClick(item)}>
          <View
            onTouchEnd={(e) => { e.stopPropagation() }}
            style={style.tabContent}
          >
            {item}
          </View>
        </View>
      )
    })

    return (
      <View style={style.container}>
        {this.tabsLayout(style)}
        {
          isIOS ?
            <IOSPaneContainer>{containerChildren}</IOSPaneContainer> :
            <AndroidPaneContainer
              visible={this.isSomeoneActive()}
              tabsLayout={this.tabsLayout(style)}
            >
              {containerChildren}
            </AndroidPaneContainer>
        }
      </View>
    )
  }
}
