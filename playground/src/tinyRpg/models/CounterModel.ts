import { CroquetReact } from 'react-together'

const { Model } = CroquetReact

export default class CounterModel extends Model {
  count: number
  init() {
    super.init({})
    this.resetCounter()

    this.subscribe(this.id, 'reset', this.resetCounter)

    this.future(1000).tick()
  }

  resetCounter() {
    this.count = 0
    this.publish('count', 'update')
  }

  tick() {
    this.count += 1
    this.future(1000).tick()
    this.publish('count', 'update')
  }
}

CounterModel.register('CounterModel')
