import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

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
    this.setState({
      currentName: name == null ? label : name
    })
  }

  render() {
    const { children } = this.props
    return (
      <View style={[defaultStyle.Tabs]}>
        <View>
          {
            React.Children.map(children, (item, index) => {
              const { label } = item['props']
              return (
                <TouchableOpacity key={index} onPress={() => this.handleTabClick(item)}>
                  <Text>{label}</Text>
                </TouchableOpacity>
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
