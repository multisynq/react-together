//! DANGER: This is broken and loops infinitely
// TODO: Fix loop
import { useEffect, useRef } from 'react';
import { useStateTogether } from 'react-together';

type GridData = (string[][] | null)

export default function DrawOnGridTogether({rtKey, width, height}: {rtKey: string, width: number, height: number}) {
  const [gridColors, set_gridColors] = useStateTogether<GridData>(rtKey, null);
  const initRef = useRef({ done: false, width: 0, height: 0 });

  useEffect(() => {
    // Skip if already initialized with same dimensions
    if (initRef.current.done && 
        initRef.current.width === width && 
        initRef.current.height === height) {
      return;
    }

    const newGrid = Array(height).fill(null).map(() => Array(width).fill('black'));

    // Copy existing data if available
    if (gridColors) {
      for (let y = 0; y < Math.min(height, gridColors.length); y++) {
        for (let x = 0; x < Math.min(width, gridColors[y].length); x++) {
          newGrid[y][x] = gridColors[y][x];
        }
      }
    }

    initRef.current = { done: true, width, height };
    set_gridColors(newGrid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const toggleCell = (x: number, y: number) => {
    if (!gridColors) return;
    const newColor = gridColors[y][x] === 'black' ? 'cyan' : 'black';
    set_gridColors(prev => 
      prev?.map((row, i) => 
        row.map((cell, j) => 
          i === y && j === x ? newColor : cell
        )
      ) ?? null
    );
  };

  if (!gridColors) return <div>Loading...</div>;

  return (
    <div>
      <h1>The Grid</h1>
      <div className="flex flex-col">
        {gridColors.map((row, y) => (
          <div key={`row-${y}`} className="flex flex-row">
            {row.map((color, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  backgroundColor: color,
                  width: '30px',
                  height: '30px',
                  display: 'block'
                }}
                className='border border-cyan'
                onClick={() => toggleCell(x, y)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
