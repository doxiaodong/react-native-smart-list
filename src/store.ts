import Watch from './utils/watch'

export class Store extends Watch {
  private currentName: null

  setName(name) {
    this.currentName = name
  }

  close() {
    this.setName(null)
  }
}

export default new Store()
