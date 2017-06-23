import React, { Component } from 'react'
import {
  View,
  Modal
} from 'react-native'

export default class AndroidPaneContainer extends Component<{
  tabsLayout: React.ReactElement<any>
  visible: boolean
}, {}> {

  state = {
    layout: { y: 0 }
  }

  onLayout = (e) => {
    this.setState({ layout: e.nativeEvent.layout })
  }

  render() {
    const { visible, tabsLayout, children } = this.props
    const modalViewStyle = {
      top: this.state.layout.y
    }
    return (
      <View onLayout={this.onLayout}>
        <Modal transparent={true} onRequestClose={() => null} visible={visible}>
          <View style={modalViewStyle}>
            <View>
              {tabsLayout}
            </View>
            <View>
              {children}
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
