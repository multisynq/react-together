import { useMultisynqContext, useView } from '@multisynq/react'
import { useEffect, useState } from 'react'
import ReactTogetherModel from '../models/ReactTogetherModel'
import useNicknames from './useNicknames'

export default function useIsSynchronized() {
  const hasSession = useView() !== null
  const { view, model } = useMultisynqContext<ReactTogetherModel>()
  const [isSynced, set_isSynced] = useState(false)

  // If we have at least one nickname:
  // It means the useStateTogether hook has been populated by the model.
  // We are using this as we always have at least one user (ourselves) if we are properly connected.
  const [, , allNicknames] = useNicknames()
  const hasOneView = Object.keys(allNicknames).length > 0

  // We also check whether we are up to date with the model (simulation)
  // This will return false if the simulation has fallen behind.
  // This can happen if the Model is doing heavy processing and trying to catch up to the time+events sent by the reflector.
  useEffect(() => {
    if (!view || !model) return
    view.subscribe(view.viewId, 'synced', set_isSynced)
    return () => view.unsubscribe(view.viewId, 'synced', set_isSynced)
  }, [view, model])

  const isSynchronized = hasOneView && hasSession && isSynced
  return isSynchronized
}
