import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native'
import store from '../store'
import AndroidPaneContainer from './AndroidPaneContainer'
import IOSPaneContainer from './IOSPaneContainer'

import globalStyle from '../style'
import defaultStyle from './style'

const isIOS = Platform.OS === 'ios'

export default class Tabs extends Component<{
  labelIcon: React.ReactElement<any>
  labelIconActive: React.ReactElement<any>
  maxLabelLength?: number
  iosUseModal?: boolean
}, {}> {

  static defaultProps = {
    maxLabelLength: 4,
    iosUseModal: false
  }

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
    if (label.length > max) {
      return label.slice(0, max) + '...'
    }
    return label
  }

  tabsLayout = (style) => {
    const { children, maxLabelLength, labelIcon, labelIconActive } = this.props
    return (
      <View style={style.tabs}>
        {
          React.Children.map(children, (item, index) => {
            const { name, label, selectedLabel } = item['props']
            const isFirst = index === 0
            const isActive = this.isActive(name, label)
            return (
              <View key={index} style={[style.tab, isActive && style.activeTab]}>
                <View style={[{ width: '100%' }, !isFirst && style.tabIsNotFirst]}>
                  <TouchableOpacity
                    style={style.tabContainer}
                    onPress={() => this.handleTabClick(item)}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[style.text, isActive && style.activeText]}>
                        {this.shadowLabel(selectedLabel || label, maxLabelLength)}
                      </Text>
                      {isActive ? labelIconActive : labelIcon}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }

  render() {
    const { children, iosUseModal } = this.props
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
          (isIOS && !iosUseModal) ?
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
