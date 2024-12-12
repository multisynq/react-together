import { useJoinedViews as ujv, useModelRoot } from '@croquet/react'
import {
  adjectives,
  animals,
  uniqueNamesGenerator
} from 'unique-names-generator'
import ReactTogetherModel, { getUserId } from '../models/ReactTogetherModel'
import useMyId from './useMyId'

export interface ConnectedUser {
  userId: string
  name: string
  isYou: boolean
}

const EMPTY_ARRAY: ConnectedUser[] = []

export default function useConnectedUsers(): ConnectedUser[] {
  const { viewIds } = ujv()
  const model = useModelRoot<ReactTogetherModel>()
  const myId = useMyId()

  if (!model) {
    return EMPTY_ARRAY
  }

  return viewIds.map((viewId) => {
    return {
      userId: getUserId(model, viewId),
      isYou: viewId === myId,
      name: uniqueNamesGenerator({
        seed: viewId,
        dictionaries: [adjectives, animals],
        length: 2,
        separator: ' ',
        style: 'capital'
      })
    }
  })
}
