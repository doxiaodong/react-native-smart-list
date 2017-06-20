import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {},
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
    position: 'absolute',
    width: '100%',
    height: 3000, // 足够大保证覆盖全屏幕
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  tabContent: {
    backgroundColor: 'white'
  }
})
