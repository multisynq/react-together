import { CroquetReact, useMyId } from 'react-together'
import { OverrideModel } from '../models'
import Label from './Label'

const { useModelSelector } = CroquetReact

export default function ScoreLabel() {
  const myId = useMyId()!
  const value = useModelSelector(
    (m: OverrideModel) => m.rpg.playerData.get(myId)?.score.toString() || '?'
  )

  // console.log(`<ScoreLabel value=${value}/>`)
  return <Label label="Score" value={value ?? 0} />
}
