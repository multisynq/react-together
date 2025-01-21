import { createContext } from 'react'

export interface ReactTogetherContextType {
  deriveNickname: (userId: string) => string
}

export const ReactTogetherContext =
  createContext<ReactTogetherContextType | null>(null)
