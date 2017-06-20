export default class Watch {
  $watch(value, cb: (next?) => void) {
    Object.defineProperty(this, value, {
      configurable: true,
      set(v) {
        cb(v)
      }
    })
  }

  $unwatch(value) {
    Object.defineProperty(this, value, {
      configurable: true,
      set(v) {
        'do nothing'
      }
    })
  }
}
