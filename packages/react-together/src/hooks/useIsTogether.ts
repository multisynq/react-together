import { useView } from '@croquet/react'
import useNicknames from './useNicknames'

export default function useIsTogether(synchronized = true) {
  const hasSession = useView() !== null

  // If we have at least one nickname:
  // It means the useStateTogether hook has been populated by the model.
  // We are using this as we always have at least one user (ourselves) if we are properly connected.
  const [, , allNicknames] = useNicknames()
  const isSynchronized = Object.keys(allNicknames).length > 0

  return synchronized ? hasSession && isSynchronized : hasSession
}
