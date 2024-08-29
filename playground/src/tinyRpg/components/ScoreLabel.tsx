import { useModelSelector, useViewId } from 'react-together'
import { OverrideModel } from '../models'
import Label from './Label'

export default function ScoreLabel() {
  const viewId = useViewId()!
  const value = useModelSelector(
    (m: OverrideModel) => m.rpg.playerData.get(viewId)?.score.toString() || '?'
  )

  // console.log(`<ScoreLabel value=${value}/>`)
  return <Label label="Score" value={value} />
}
