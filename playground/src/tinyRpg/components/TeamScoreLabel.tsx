import { MultisynqReact } from 'react-together'
import { OverrideModel } from '../models'
import Label from './Label'

const { useModelSelector } = MultisynqReact

export default function TeamScoreLabel() {
  const value = useModelSelector((m: OverrideModel) =>
    [...m.rpg.playerData.values()].reduce(
      (p, { score }) => p + score,
      0 as number
    )
  )
  // console.log(`<TeamScoreLabel value=${value}/>`)
  return <Label label="Team Score" value={value?.toString() ?? 0} />
}
