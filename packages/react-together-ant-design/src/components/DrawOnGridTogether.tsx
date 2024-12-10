import { useEffect } from 'react'
import { useStateTogether } from 'react-together'

export function DrawOnGridTogether({width, height}: {width: number, height: number}){
  const [gridColors, set_gridColors] = useStateTogether('grid-colors', [[]] as string[][])
  useEffect(() => {
    // keep any values that are present, but make the array size expand or shrink as is needed
    const newGrid = gridColors.map((row, y) => row.map((color, x) => {
      if (x < width && y < height) {
        return color
      }
      return 'white'
    }))
    set_gridColors(newGrid)
  }, [width, height,gridColors, set_gridColors])
  function modGrid(x: number, y: number, new_color: string){
    set_gridColors(prevCols => prevCols.map((row, i) => row.map((color, j) => {
      if (j === x && i === y) return new_color
      else                    return color
    })))
  }
  return (
    <div>
      {
        gridColors.map((row, y) => row.map((color, x) => {
          return <div key={`${x}-${y}`} 
            style={{backgroundColor: color}} 
            className='w-1 h-1'
            onClick={() => modGrid(x, y, 'red')}
          />
        }))
      }
    </div>
  )
}
