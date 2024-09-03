import { useModelSelector } from 'react-together'
import { Coin } from '../components'
import { OverrideModel } from '../models'
import { numberToPosition } from '../models/TinyRpgModel'

export default function Coins() {
  const coins = useModelSelector((model: OverrideModel) =>
    Array.from(model.rpg.coins)
  )
  const BOARD_WIDTH = useModelSelector((m: OverrideModel) => m.rpg.BOARD_WIDTH)

  // console.log(`<Coins coins=${JSON.stringify(coins)}/>`)
  return coins.map((position, index) => {
    const { x, y } = numberToPosition(position, BOARD_WIDTH)

    return <Coin key={index} {...{ x, y }} />
  })
}
