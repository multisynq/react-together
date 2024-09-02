import { useContext } from 'react'
import { ReactTogetherContext } from '../ReactTogetherContext'

export default function useReactTogetherContext() {
  const contextValue = useContext(ReactTogetherContext)
  if (contextValue === undefined) {
    throw new Error('Not inside ReactTogether context')
  }
  return contextValue
}
