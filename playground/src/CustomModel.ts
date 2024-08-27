import { ReactTogetherModel } from 'react-together'

export default class MyModel extends ReactTogetherModel {
  init(options) {
    super.init(options)
    this.subscribe(this.id, 'test', this.test)
  }

  test() {
    console.log('Running test inside model')
  }
}
MyModel.register('MyModel')
