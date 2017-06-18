import React from 'react'
import { View, Text } from 'react-native'
import renderer from 'react-test-renderer'
import SmartList, { Tabs, Pane } from '@/index'

describe('SmartList Component', () => {
  test('Snapshot', () => {
    const component = renderer.create(
      <SmartList
        tabs={
          <Tabs>
            <Pane label="1">111</Pane>
            <Pane label="2">222</Pane>
            <Pane label="3">333</Pane>
          </Tabs>
        }
      >
        <View>
          <Text>List</Text>
        </View>
      </SmartList>
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
