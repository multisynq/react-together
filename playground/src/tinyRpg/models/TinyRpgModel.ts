import { CroquetReact } from 'react-together'

const { ReactModel } = CroquetReact

export type Direction = 'up' | 'down' | 'left' | 'right'
export type Position = { x: number; y: number }

function positionToNumber(position: Position, size: number): number {
  return position.x * size + position.y
}

export function numberToPosition(number: number, size: number): Position {
  const x = Math.floor(number / size)
  const y = number % size
  return { x, y }
}

export interface PlayerData {
  position: Position
  score: number
}

export interface MoveArgs {
  viewId: string
  direction: Direction
}

export default class TinyRpgModel extends ReactModel {
  // Configuration
  BOARD_WIDTH: number
  BOARD_HEIGHT: number
  MAX_COINS: number

  AVOID_COLLISIONS: boolean
  WRAP_BORDERS: boolean

  // Model data
  playerData: Map<string, PlayerData>
  positions: Map<number, string>
  coins: Set<number>

  init() {
    super.init({})

    this.BOARD_WIDTH = 10
    this.BOARD_HEIGHT = 10
    this.MAX_COINS = 5

    this.AVOID_COLLISIONS = false
    this.WRAP_BORDERS = false

    this.playerData = new Map<string, PlayerData>()
    this.positions = new Map<number, string>()
    this.coins = new Set()

    this.subscribe(this.id, 'move', this.move)
    this.future(5000).spawnCoin()
  }

  getRandomPosition() {
    return {
      x: Math.floor(Math.random() * this.BOARD_WIDTH),
      y: Math.floor(Math.random() * this.BOARD_HEIGHT)
    }
  }
  getNextPosition(p: Position, d: Direction): Position {
    const { x, y } = p
    let newX = x
    let newY = y

    if (this.WRAP_BORDERS) {
      switch (d) {
        case 'up':
          newY = (this.BOARD_HEIGHT + newY - 1) % this.BOARD_HEIGHT
          break
        case 'down':
          newY = (this.BOARD_HEIGHT + newY + 1) % this.BOARD_HEIGHT
          break
        case 'left':
          newX = (this.BOARD_WIDTH + newX - 1) % this.BOARD_WIDTH
          break
        case 'right':
          newX = (this.BOARD_WIDTH + newX + 1) % this.BOARD_WIDTH
          break
      }
      return { x: newX, y: newY }
    } else {
      switch (d) {
        case 'up':
          newY = Math.max(0, y - 1)
          break
        case 'down':
          newY = Math.min(this.BOARD_HEIGHT - 1, y + 1)
          break
        case 'left':
          newX = Math.max(0, x - 1)
          break
        case 'right':
          newX = Math.min(this.BOARD_WIDTH - 1, x + 1)
          break
      }
      return { x: newX, y: newY }
    }
  }

  move(args: MoveArgs) {
    const { viewId, direction } = args
    const data = this.playerData.get(viewId)

    // return if there is no player with this viewId
    if (!data) return

    const { position: oldPos } = data

    const newPos = this.getNextPosition(oldPos, direction)
    const newPosNumber = positionToNumber(newPos, this.BOARD_WIDTH)

    // return if there is a player in the new position
    if (this.AVOID_COLLISIONS && this.positions.get(newPosNumber)) return

    // Check if caught coin
    if (this.coins.has(newPosNumber)) {
      data.score++
      this.coins.delete(newPosNumber)
    }

    data.position = newPos
    this.positions.delete(positionToNumber(oldPos, this.BOARD_WIDTH))
    this.positions.set(newPosNumber, viewId)
  }

  spawnCoin() {
    this.future(3000).spawnCoin()

    if (this.coins.size >= this.MAX_COINS) return
    const position = this.findEmptyPosition()
    if (!position) return

    // console.log('Added coin on', position)
    this.coins.add(positionToNumber(position, this.BOARD_WIDTH))
  }

  findEmptyPosition(): Position | null {
    if (
      this.positions.size + this.coins.size >=
      this.BOARD_WIDTH * this.BOARD_HEIGHT * 0.5
    ) {
      console.log('Field is saturated. Wait for players to disconnect')
      // TODO: eventually implement queue logic
      return null
    }
    let position
    do {
      position = this.getRandomPosition()
    } while (
      this.positions.has(positionToNumber(position, this.BOARD_WIDTH)) ||
      this.coins.has(positionToNumber(position, this.BOARD_WIDTH))
    )
    return position
  }

  handleViewJoin(viewId: string): void {
    const position = this.findEmptyPosition()
    if (!position) return

    this.playerData.set(viewId, { score: 0, position })
    this.positions.set(positionToNumber(position, this.BOARD_WIDTH), viewId)
  }

  handleViewExit(viewId: string): void {
    const data = this.playerData.get(viewId)
    if (!data) return

    this.positions.delete(positionToNumber(data.position, this.BOARD_WIDTH))
    this.playerData.delete(viewId)
  }
}
TinyRpgModel.register('TinyRpgModel')
