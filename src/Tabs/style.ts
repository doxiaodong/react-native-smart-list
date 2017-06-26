import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {},
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: '#ccc',
    backgroundColor: '#eee'
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc'
  },
  activeTab: {},
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  tabIsNotFirst: {
    borderLeftWidth: 1
  },
  text: {
    paddingRight: 5
  },
  icon: {},
  activeText: {
    color: 'red'
  },
  activeIcon: {
    color: 'red'
  },

  tabContentContainer: {
    top: 1,
    width: '100%',
    height: 3000, // 足够大保证覆盖全屏幕
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  tabContent: {
    maxHeight: 250, // 设置每个下拉列表的最大高度
    backgroundColor: 'white'
  }
})
