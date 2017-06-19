import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import defaultStyle from './style'

export default class Tabs extends Component<{}, {}> {

  state = {
    currentName: null
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
    this.setState({
      currentName: nextName
    })
  }

  render() {
    const { children } = this.props
    return (
      <View style={[defaultStyle.container]}>
        <View style={defaultStyle.tabs}>
          {
            React.Children.map(children, (item, index) => {
              const { name, label } = item['props']
              const isFirst = index === 0
              const isActive = this.isActive(name, label)
              return (
                <View key={index} style={[defaultStyle.tab, !isFirst && defaultStyle.tabIsNotFirst]}>
                  <TouchableOpacity
                    style={defaultStyle.tabContainer}
                    onPress={() => this.handleTabClick(item)}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[defaultStyle.text, isActive && defaultStyle.activeText]}>{label}</Text>
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
            return (
              <View>
                {this.isActive(name, label) && item}
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
