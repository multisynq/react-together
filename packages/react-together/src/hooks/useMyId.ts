import { useModelRoot, useViewId } from '@croquet/react'
import ReactTogetherModel, { getUserId } from '../models/ReactTogetherModel'

export default function useMyId() {
  const model = useModelRoot<ReactTogetherModel>()
  const viewId = useViewId()
  if (!model || !viewId) {
    return null
  }

  return getUserId(model, viewId)
}
