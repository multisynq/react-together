import { useConnectedViews as ucv, useViewId } from '@croquet/react'
import {
  adjectives,
  animals,
  uniqueNamesGenerator
} from 'unique-names-generator'

export type ConnectedView = {
  viewId: string
  name: string
  isYou: boolean
}

export default function useConnectedViews(): ConnectedView[] {
  const { views } = ucv()
  const viewId = useViewId()

  return Array.from(views).map((vid: string) => {
    return {
      viewId: vid,
      isYou: vid === viewId,
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
