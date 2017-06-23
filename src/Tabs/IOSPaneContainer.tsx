import React, { Component } from 'react'
import { View } from 'react-native'

export default class AndroidPaneContainer extends Component<{}, {}> {

  render() {
    const { children } = this.props
    return (
      <View style={{ height: 0, overflow: 'visible' }}>
        {children}
      </View>
    )
  }
}
