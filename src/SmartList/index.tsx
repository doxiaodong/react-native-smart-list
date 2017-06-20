import React, { Component } from 'react'
import { View } from 'react-native'

export default class SmartList extends Component<{
  tabs: React.ReactElement<any>
}, {}> {
  render() {
    const { tabs, children } = this.props
    return (
      <View>
        <View style={{ zIndex: 1 }}>
          {tabs}
        </View>
        <View style={{ zIndex: 0 }}>
          {children}
        </View>
      </View>
    )
  }
}
