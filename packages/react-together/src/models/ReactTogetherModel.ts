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
  viewId: string
  args: unknown[]
}

export default class ReactTogetherModel extends ReactModel {
  state: Map<string, unknown>
  stateTogether: Map<string, Map<string, unknown>>
  modelFuncs: Map<string, {viewId:string, func:(...args:any[])=>void}>

  init(options: ReactTogetherModelOptions) {
    super.init({ ...options, trackViews: true })
    this.state = new Map()
    this.stateTogether = new Map()
    this.modelFuncs = new Map()
    console.log('Wooo Hooo! Newer ReactTogetherModel is running!')
    this.subscribe(this.id, 'setState', this.setState)
    this.subscribe(this.id, 'setStateTogether', this.setStateTogether)
    this.subscribe(this.id, 'functionTogether', this.functionTogether)
    this.subscribe(this.id, 'defineModelFuncTogether', this.defineModelFuncTogether)
    this.subscribe(this.id, 'callModelFuncTogether',   this.callModelFuncTogether)
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

  functionTogether({ rtKey, viewId, args }: FunctionTogetherArgs) {
    this.publish(rtKey, 'call', { data: args, viewId, ts: this.now() })
  }

  defineModelFuncTogether({id, viewId, func} : {id:string, viewId:string, func:any} ){
    // TODO: rememeber the viewId and make sure we are not defining the same id with two diff functions
    // if (!this.modelFuncs.has(id)){
      this.modelFuncs.set(id, {viewId, func})
    // } else if (this.modelFuncs.get(id)?.viewId === viewId) {
    //   console.warn(`in useModelFunctionTogether() ${id}() already defined`)
    // }
  }

  callModelFuncTogether({id, viewId:_viewId, args}:{id:string, viewId:string, args:any[]}){
    const thang = this.modelFuncs.get(id)
    if(thang){
      const { func } = thang
      func.call(this, ...args)
    } else {
      console.error(`in useModelFunctionTogether() ${id}() not found`)
    }
  }

  handleViewExit(viewId: string): void {
    this.stateTogether.forEach((st) => st.delete(viewId))
  }
}
ReactTogetherModel.register('ReactTogetherModel')
