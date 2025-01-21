import { useJoinedViews as ujv, useModelRoot } from '@croquet/react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import useAllNicknames from './useAllNicknames'
import useMyId from './useMyId'

export interface ConnectedUser {
  userId: string
  name: string
  isYou: boolean
}

const EMPTY_ARRAY: ConnectedUser[] = []

export default function useConnectedUsers(): ConnectedUser[] {
  // Use this hook to refresh every time the views change
  ujv()

  const allNicknames = useAllNicknames()

  const model = useModelRoot<ReactTogetherModel>()
  const myId = useMyId()

  if (!model) {
    return EMPTY_ARRAY
  }

  return Array.from(model.userIdCount.keys()).map((userId) => {
    const nickname = allNicknames[userId]
    return {
      userId,
      isYou: userId === myId,
      nickname,
      get name() {
        // deprecated: kept for compatibility
        console.warn(
          'useConnectedUsers: name is deprecated. Use nickname instead.'
        )
        return nickname
      }
    }
  })
}
