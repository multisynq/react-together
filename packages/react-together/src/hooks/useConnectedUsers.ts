import { useJoinedViews as ujv, useViewId } from '@croquet/react'
import {
  adjectives,
  animals,
  uniqueNamesGenerator
} from 'unique-names-generator'

export interface ConnectedUser<T = undefined> {
  userId: string
  name: string
  isYou: boolean
  info?: T
}

export default function useConnectedUsers<T = undefined>(): ConnectedUser<T>[] {
  const { views } = ujv()
  const myId = useViewId()

  return views.map(({ viewId, info }) => {
    return {
      userId: viewId,
      info,
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
