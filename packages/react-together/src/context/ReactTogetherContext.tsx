import { createContext, useContext } from 'react'

export interface ReactTogetherContextType {
  deriveNickname: (userId: string) => string
  rememberUsers: boolean
  // Session information for use by other components like ActivitySynq
  sessionInfo?: {
    appId: string
    name: string
    password: string | undefined
  }
}

export const ReactTogetherContext =
  createContext<ReactTogetherContextType | null>(null)

export const useReactTogetherContext = (): ReactTogetherContextType | null => {
  return useContext(ReactTogetherContext)
}
