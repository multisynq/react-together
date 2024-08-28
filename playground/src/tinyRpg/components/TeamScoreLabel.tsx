import { ReactModel, useModelSelector } from 'react-together'
import { OverrideModel } from '../models'
import Label from './Label'

export default function TeamScoreLabel() {
  const value = useModelSelector((m: ReactModel) =>
    [...(m as OverrideModel).rpg.playerData.values()].reduce(
      (p, { score }) => p + score,
      0
    )
  )
  // console.log(`<TeamScoreLabel value=${value}/>`)
  return <Label label="Team Score" value={value.toString()} />
}
