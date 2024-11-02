import { useJoinedViews as ujv, useViewId } from '@croquet/react'
import {
  adjectives,
  animals,
  uniqueNamesGenerator
} from 'unique-names-generator'

export type ConnectedUser = {
  userId: string
  name: string
  isYou: boolean
}

export default function useConnectedUsers(): ConnectedUser[] {
  const { views } = ujv()
  const myId = useViewId()

  return Array.from(views).map((vid: string) => {
    return {
      userId: vid,
      isYou: vid === myId,
      name: uniqueNamesGenerator({
        seed: vid,
        dictionaries: [adjectives, animals],
        length: 2,
        separator: ' ',
        style: 'capital'
      })
    }
  })
}
