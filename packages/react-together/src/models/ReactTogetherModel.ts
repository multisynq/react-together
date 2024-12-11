import { ReactModel, ViewInfo } from '@croquet/react'
import { UseStateTogetherWithPerUserValuesOptions } from '../hooks/useStateTogetherWithPerUserValues'

interface setStateArgs<T> {
  id: string
  newValue: T | undefined
}
interface setStatePerUserArgs<T> {
  id: string
  key: string
  newValue: T | undefined
}

interface ReactTogetherModelOptions extends Record<string, unknown> {}

interface FunctionTogetherArgs {
  rtKey: string
  args: unknown[]
}

interface ConfigureStatePerUserArgs {
  id: string
  viewId: string
  options: UseStateTogetherWithPerUserValuesOptions
}

interface StatePerUserConfig {
  viewKeyOverrideMapping?: Map<string, string>
  keepValues?: boolean
}

export default class ReactTogetherModel extends ReactModel {
  state: Map<string, unknown>
  statePerUser: Map<string, Map<string, unknown>>

  statePerUserConfig: Map<string, StatePerUserConfig>

  init(options: ReactTogetherModelOptions) {
    super.init({ ...options, trackViews: true })
    this.state = new Map()
    this.statePerUser = new Map()
    this.statePerUserConfig = new Map()

    this.subscribe(this.id, 'setState', this.setState)
    this.subscribe(this.id, 'setStatePerUser', this.setStatePerUser)
    this.subscribe(this.id, 'functionTogether', this.functionTogether)

    this.subscribe(this.id, 'configureStatePerUser', this.configureStatePerUser)
  }

  setState<T>({ id, newValue }: setStateArgs<T>) {
    if (newValue === undefined) {
      this.state.delete(id)
    } else {
      this.state.set(id, newValue)
    }
    this.publish(id, 'updated', {})
  }

  setStatePerUser<T>({ id, key, newValue }: setStatePerUserArgs<T>) {
    let spu = this.statePerUser.get(id)
    if (spu === undefined) {
      spu = new Map<string, T>()
    }
    if (newValue === undefined) {
      spu.delete(key)
    } else {
      spu.set(key, newValue)
    }
    this.statePerUser.set(id, spu)
    this.publish(id, 'updated', {})
  }

  functionTogether({ rtKey, args }: FunctionTogetherArgs) {
    this.publish(rtKey, 'call', args)
  }

  configureStatePerUser({ id, viewId, options }: ConfigureStatePerUserArgs) {
    const { keyOverride, keepValues } = options

    const config = this.statePerUserConfig.get(id) ?? {}
    if (keyOverride !== undefined) {
      if (config.viewKeyOverrideMapping === undefined) {
        config.viewKeyOverrideMapping = new Map()
      }
      config.viewKeyOverrideMapping.set(viewId, keyOverride)
    }
    if (keepValues !== undefined) {
      config.keepValues = keepValues
    }
    this.statePerUserConfig.set(id, config)
  }

  handleViewExit(viewId: string | ViewInfo<unknown>) {
    viewId = typeof viewId !== 'string' ? viewId.viewId : viewId
    this.statePerUser.forEach((st, rtKey) => {
      const config = this.statePerUserConfig.get(rtKey)
      const persistData = config?.keepValues
      const viewKeyOverrideMapping = config?.viewKeyOverrideMapping
      if (!persistData) {
        // If the exiting view has a keyOverride, we just delete it if any other view
        // has the same keyOverride
        const keyOverride = viewKeyOverrideMapping?.get(viewId)
        if (!viewKeyOverrideMapping || !keyOverride) {
          st.delete(viewId)
          this.publish(rtKey, 'updated', {})
        } else {
          // If the exiting view has a keyOverride, we need to delete it if any other view
          // has the same keyOverride
          const otherViewIdsHaveSameKeyOverride = Array.from(
            viewKeyOverrideMapping.entries()
          ).some(([otherViewId, otherKeyOverride]) => {
            return otherViewId !== viewId && otherKeyOverride === keyOverride
          })
          if (!otherViewIdsHaveSameKeyOverride) {
            st.delete(keyOverride)
            this.publish(rtKey, 'updated', {})
          }
        }
      }
      viewKeyOverrideMapping?.delete(viewId)
    })
  }
}
ReactTogetherModel.register('ReactTogetherModel')
