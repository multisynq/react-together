import { useContext } from 'react'
import {
  ReactTogetherContext,
  ReactTogetherContextType
} from '../context/ReactTogetherContext'

export default function useReactTogetherContext(): ReactTogetherContextType {
  const context = useContext(ReactTogetherContext)
  if (context === null) {
    throw new Error(
      'useReactTogetherContext must be used within a ReactTogetherProvider'
    )
  }
  return context
}
