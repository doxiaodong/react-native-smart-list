import React, { Component } from 'react'
import { View } from 'react-native'

import defaultStyle from './style'

export default class TabPane extends Component<{
  label: string
  selectedLabel?: string
  name?: string
}, {}> {
  render() {
    const { children } = this.props
    return (
      <View style={[defaultStyle.TabPane]}>
        {children}
      </View>
    )
  }
}
