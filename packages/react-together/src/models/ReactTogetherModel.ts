import { ReactModel } from '@croquet/react'

type setStateArgs<T> = {
  id: string
  newValue: T | undefined
}
type setStateTogetherArgs<T> = {
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
  stateTogether: Map<string, Map<string, unknown>>

  init(options: ReactTogetherModelOptions) {
    super.init({ ...options, trackViews: true })
    this.state = new Map()
    this.stateTogether = new Map()

    this.subscribe(this.id, 'setState', this.setState)
    this.subscribe(this.id, 'setStateTogether', this.setStateTogether)
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

  setStateTogether<T>({ id, viewId, newValue }: setStateTogetherArgs<T>) {
    let st = this.stateTogether.get(id)
    if (st === undefined) {
      st = new Map<string, T>()
    }
    if (newValue === undefined) {
      st.delete(viewId)
    } else {
      st.set(viewId, newValue)
    }
    this.stateTogether.set(id, st)
    this.publish(id, 'updated', {})
  }

  functionTogether({ rtKey, args }: FunctionTogetherArgs) {
    this.publish(rtKey, 'call', args)
  }
}
ReactTogetherModel.register('ReactTogetherModel')
