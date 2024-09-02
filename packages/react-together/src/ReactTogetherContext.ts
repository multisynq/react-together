import { createContext } from 'react'

export interface ReactTogetherContext {
  createNewSession: () => void
}

export const ReactTogetherContext = createContext<
  ReactTogetherContext | undefined
>(undefined)
