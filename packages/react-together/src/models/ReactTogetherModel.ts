import { ReactModel, ViewInfo } from '@multisynq/react'
import { UseStateTogetherWithPerUserValuesOptions } from '../hooks/useStateTogetherWithPerUserValues'
import ChatModel from './ChatModel'

interface setStateArgs<T> {
  rtKey: string
  value: T | undefined
}
interface SetStatePerUserArgs<T> {
  rtKey: string
  userId: string
  value: T | undefined
}

interface ReactTogetherModelOptions extends Record<string, unknown> {}

interface FunctionTogetherArgs {
  rtKey: string
  args: unknown[]
}

interface CreateChatArgs {
  rtKey: string
}

interface ConfigureStatePerUserArgs {
  rtKey: string
  userId: string
  options: UseStateTogetherWithPerUserValuesOptions
}

interface StatePerUserConfig {
  keepValues?: boolean
}

export default class ReactTogetherModel extends ReactModel {
  state: Map<string, unknown>

  statePerUser: Map<string, Map<string, unknown>>
  statePerUserConfig: Map<string, StatePerUserConfig>

  chats: Map<string, ChatModel>

  viewIdUserIdMapping: Map<string, string>
  userIdCount: Map<string, number>

  init(options: ReactTogetherModelOptions) {
    super.init({ ...options, trackViews: true })

    this.state = new Map()

    this.statePerUser = new Map()
    this.statePerUserConfig = new Map()

    this.chats = new Map()

    this.viewIdUserIdMapping = new Map()
    this.userIdCount = new Map()

    this.subscribe(this.id, 'setState', this.setState)

    this.subscribe(this.id, 'setStatePerUser', this.setStatePerUser)
    this.subscribe(this.id, 'configureStatePerUser', this.configureStatePerUser)

    this.subscribe(this.id, 'functionTogether', this.functionTogether)

    this.subscribe(this.id, 'createChat', this.createChat)
  }

  handleViewJoin(viewId: string, viewInfo: ViewInfo<{ userId?: string }>) {
    // Every viewId has a userId. If userId is not provided, it defaults to viewId
    const userId = viewInfo.viewData?.userId ?? viewId

    // Update viewId -> userId mapping
    this.viewIdUserIdMapping.set(viewId, userId)

    // Update number of views per userId
    const count = this.userIdCount.get(userId) ?? 0
    this.userIdCount.set(userId, count + 1)
  }

  handleViewExit(viewId: string) {
    const userId = getUserId(this, viewId)

    // Will be used to determine if we should delete the userId from the statePerUser
    const userIdCount = this.userIdCount.get(userId)
    if (userIdCount === undefined) {
      console.warn(
        `No userIdCount found for userId ${userId}. This is likely a bug. Please report it to the React Together team.`
      )
      return
    }

    // If there is a single view left for the userId, we need
    // to delete that userId from active statePerUser
    if (userIdCount <= 1) {
      this.statePerUser.forEach((st, rtKey) => {
        const config = this.statePerUserConfig.get(rtKey)
        if (!config?.keepValues) {
          st.delete(userId)
          this.publish(rtKey, 'updated', {})
        }
      })

      // Update count per userId. If given userId has no more views, delete it
      this.userIdCount.delete(userId)
    } else {
      this.userIdCount.set(userId, userIdCount - 1)
    }

    // Update viewId -> userId mapping
    this.viewIdUserIdMapping.delete(viewId)
  }

  setState<T>({ rtKey, value }: setStateArgs<T>) {
    this.state.set(rtKey, value)
    this.publish(rtKey, 'updated', {})
  }

  setStatePerUser<T>({ rtKey, userId, value }: SetStatePerUserArgs<T>) {
    let spu = this.statePerUser.get(rtKey)
    if (spu === undefined) {
      spu = new Map<string, T>()
      this.statePerUser.set(rtKey, spu)
    }

    spu.set(userId, value)
    this.publish(rtKey, 'updated', {})
  }

  configureStatePerUser({ rtKey, options }: ConfigureStatePerUserArgs) {
    const { keepValues } = options

    const config = this.statePerUserConfig.get(rtKey) ?? {}
    if (keepValues !== undefined) {
      config.keepValues = keepValues
    }
    this.statePerUserConfig.set(rtKey, config)
  }

  functionTogether({ rtKey, args }: FunctionTogetherArgs) {
    this.publish(rtKey, 'call', args)
  }

  createChat({ rtKey }: CreateChatArgs) {
    const chat = ChatModel.create({ rtKey })
    this.chats.set(rtKey, chat)
  }
}
ReactTogetherModel.register('ReactTogetherModel')

// Keeping this access function outside of the model class
// so that we can call it from the view side
export function getUserId(model: ReactTogetherModel, viewId: string): string {
  const userId = model.viewIdUserIdMapping.get(viewId)
  if (userId === undefined) {
    console.warn(
      `No userId found for viewId ${viewId}. This is likely a bug. Please report it to the React Together team.`
    )
    return viewId
  }
  return userId
}

export function getChat(model: ReactTogetherModel, rtKey: string) {
  return model.chats.get(rtKey)
}
