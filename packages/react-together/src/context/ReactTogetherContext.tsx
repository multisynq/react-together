import { createContext } from 'react'

export interface ReactTogetherContextType {
  deriveNickname: (userId: string) => string
  rememberUsers: boolean
}

export const ReactTogetherContext =
  createContext<ReactTogetherContextType | null>(null)
