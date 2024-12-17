import { useJoinedViews as ujv, useModelRoot } from '@croquet/react'
import {
  adjectives,
  animals,
  uniqueNamesGenerator
} from 'unique-names-generator'
import ReactTogetherModel from '../models/ReactTogetherModel'
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

  const model = useModelRoot<ReactTogetherModel>()
  const myId = useMyId()

  if (!model) {
    return EMPTY_ARRAY
  }

  return Array.from(model.userIdCount.keys()).map((userId) => {
    return {
      userId,
      isYou: userId === myId,
      name: uniqueNamesGenerator({
        seed: userId,
        dictionaries: [adjectives, animals],
        length: 2,
        separator: ' ',
        style: 'capital'
      })
    }
  })
}
