import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import SmartList, { Tabs, Pane, store } from './sm'
import { dataFilters, initFilters } from './data'

export default class App extends Component {

  state = {
    filters: initFilters(dataFilters)
  }

  selectFilter = (key, item) => {
    const filters = { ...this.state.filters }
    filters[key] = item
    this.setState({ filters })
    store.close()

    // do with filters to get list data
    console.log(filters)
  }

  renderTabItem = ({ item }, tab) => {
    const key = tab.label
    const selected = this.state.filters[key] || {}
    const isChecked = selected.name === item.name
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee' }}>
        <TouchableOpacity style={{ padding: 10, flexDirection: 'row' }} onPress={() => { this.selectFilter(key, item) }}>
          <Text style={{ flex: 1 }}>{item.label}</Text>
          {isChecked && <Icon style={{}} name="check" color="green" />}
        </TouchableOpacity>
      </View>

    )
  }

  render() {
    return (
      <View>
        <View style={{ height: 50 }}>
          <Text>hahah</Text>
        </View>
        <SmartList
          tabs={
            <Tabs>
              {dataFilters.map((t) => {
                const { label, values } = t
                const selected = this.state.filters[t.label] || {}
                return (
                  <Pane key={label} label={label} selectedLabel={selected.name === 'all' ? null : selected.label}>
                    <FlatList
                      data={values}
                      renderItem={(param) => this.renderTabItem(param, t)}
                      keyExtractor={(item) => item.name}
                      extraData={this.state}
                    />
                  </Pane>
                )
              })}
            </Tabs>
          }
        >
          <Text>list</Text>
        </SmartList>
      </View>
    )
  }
}
