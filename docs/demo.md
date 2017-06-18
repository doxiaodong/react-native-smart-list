```
<SmartList
  tabs={
    <Tabs>
      <TabPane label="1">Content of Tab Pane 1{this.props.value1}</TabPane>
      <TabPane label="2">Content of Tab Pane 2{this.props.value2}</TabPane>
      <TabPane label="3">Content of Tab Pane 3{this.props.value3}</TabPane>
    </Tabs>
  }
>
  <FlatList />
</SmartList>


const data = [{
  key: '1',
  desc: '1'
  value: 1
}]

<SmartList
  tabs={
    <Tabs>
      data.map(({key, desc, value}) => {
        
      })
      <TabPane label="Tab 1">Content of Tab Pane 1{this.props.value1}</TabPane>
      <TabPane label="Tab 2">Content of Tab Pane 2{this.props.value2}</TabPane>
      <TabPane label="Tab 3">Content of Tab Pane 3{this.props.value3}</TabPane>
    </Tabs>
  }
>
  <FlatList />
</SmartList>
```
