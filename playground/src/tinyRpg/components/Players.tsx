import { MultisynqReact } from 'react-together'
import { OverrideModel } from '../models'
import Player from './Player'
const { useModelSelector } = MultisynqReact

export default function Players() {
  const players = useModelSelector((m: OverrideModel) => [
    ...m.rpg.playerData.keys()
  ])

  return players?.map((viewId) => <Player key={viewId} id={viewId} />)
}
