import { ReactModel } from '@croquet/react'

type setStateArgs<T> = {
  id: string
  newValue: T | undefined
}
type setStatePerUserArgs<T> = {
  id: string
  viewId: string
  newValue: T | undefined
}

type ReactTogetherModelOptions = Record<string, unknown>

type FunctionTogetherArgs = {
  rtKey: string
  args: unknown[]
}

export default class ReactTogetherModel extends ReactModel {
  state: Map<string, unknown>
  statePerUser: Map<string, Map<string, unknown>>

  init(options: ReactTogetherModelOptions) {
    super.init({ ...options, trackViews: true })
    this.state = new Map()
    this.statePerUser = new Map()

    this.subscribe(this.id, 'setState', this.setState)
    this.subscribe(this.id, 'setStatePerUser', this.setStatePerUser)
    this.subscribe(this.id, 'functionTogether', this.functionTogether)
  }

  setState<T>({ id, newValue }: setStateArgs<T>) {
    if (newValue === undefined) {
      this.state.delete(id)
    } else {
      this.state.set(id, newValue)
    }
    this.publish(id, 'updated', {})
  }

  setStatePerUser<T>({ id, viewId, newValue }: setStatePerUserArgs<T>) {
    let st = this.statePerUser.get(id)
    if (st === undefined) {
      st = new Map<string, T>()
    }
    if (newValue === undefined) {
      st.delete(viewId)
    } else {
      st.set(viewId, newValue)
    }
    this.statePerUser.set(id, st)
    this.publish(id, 'updated', {})
  }

  functionTogether({ rtKey, args }: FunctionTogetherArgs) {
    this.publish(rtKey, 'call', args)
  }
}
ReactTogetherModel.register('ReactTogetherModel')
