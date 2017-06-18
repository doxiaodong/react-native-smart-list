import React, { Component } from 'react'
import { View, Text } from 'react-native'
import SmartList, { Tabs, Pane } from './sm'

export default class App extends Component {
  render() {
    return (
      <View>
        <View style={{height: 50}}>
          <Text>hahah</Text>
        </View>
        <SmartList
          tabs={
            <Tabs>
              <Pane label="111"><Text>哈哈哈111</Text></Pane>
              <Pane label="222"><Text>哈哈哈222</Text></Pane>
              <Pane label="333"><Text>哈哈哈333</Text></Pane>
            </Tabs>
          }
        >
          <Text>list</Text>
        </SmartList>
      </View>
    )
  }
}
