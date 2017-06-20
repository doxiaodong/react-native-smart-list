import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import store from '../store'

import defaultStyle from './style'

export default class Tabs extends Component<{}, {}> {

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

  render() {
    const { children } = this.props
    return (
      <View style={[defaultStyle.container]}>
        <View style={defaultStyle.tabs}>
          {
            React.Children.map(children, (item, index) => {
              const { name, label, selectedLabel } = item['props']
              const isFirst = index === 0
              const isActive = this.isActive(name, label)
              return (
                <View key={index} style={[defaultStyle.tab, !isFirst && defaultStyle.tabIsNotFirst]}>
                  <TouchableOpacity
                    style={defaultStyle.tabContainer}
                    onPress={() => this.handleTabClick(item)}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[defaultStyle.text, isActive && defaultStyle.activeText]}>
                        {selectedLabel || label}
                      </Text>
                      <Icon
                        name={isActive ? 'angle-up' : 'angle-down'}
                        style={isActive && defaultStyle.activeIcon}
                        size={16}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
        <View>
          {React.Children.map(children, (item) => {
            const { name, label } = item['props']
            return this.isActive(name, label) &&
              <View style={defaultStyle.tabContentContainer} onTouchEnd={() => this.handleTabClick(item)}>
                <View onTouchEnd={(e) => { e.stopPropagation() }} style={defaultStyle.tabContent}>
                  {item}
                </View>
              </View>
          })}
        </View>
      </View>
    )
  }
}
