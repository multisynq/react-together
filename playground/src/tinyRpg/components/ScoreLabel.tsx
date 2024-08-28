import { ReactModel, useModelSelector, useViewId } from 'react-together'
import { OverrideModel } from '../models'
import Label from './Label'

export default function ScoreLabel() {
  const viewId = useViewId()!
  const value = useModelSelector(
    (m: ReactModel) => (m as OverrideModel).rpg.playerData.get(viewId)?.score
  ) as number | null

  // console.log(`<ScoreLabel value=${value}/>`)
  return <Label label="Score" value={value !== null ? value.toString() : '?'} />
}
