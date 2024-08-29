import { ReactTogetherModel } from 'react-together'
import CounterModel from './CounterModel'
import TinyRpgModel from './TinyRpgModel'

export class OverrideModel extends ReactTogetherModel {
  rpg: TinyRpgModel
  counter: CounterModel

  init() {
    super.init({})
    this.rpg = TinyRpgModel.create({})
    this.counter = CounterModel.create({})
  }
}
OverrideModel.register('OverrideModel')
