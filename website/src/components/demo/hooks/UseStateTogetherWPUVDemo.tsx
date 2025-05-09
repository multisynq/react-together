import { MultisynqReact, useStateTogetherWithPerUserValues } from 'react-together'

const { useViewId } = MultisynqReact

function Score({ score, clickable, onClick, onContextMenu }) {
  const clickableStyle = clickable ? 'cursor-pointer shadow-sm bg-gray-500 text-white' : ''
  return (
    <div className='flex flex-col align-items-start'>
      {/* {clickable && (
              <span className='text-xs'>
                Your score: <br />
                (Click to increment)
              </span>
            )} */}
      <div
        className={'py-2 px-4 flex items-center justify-center bg-gray-100 rounded-lg select-none ' + clickableStyle}
        onClick={onClick}
        onContextMenu={onContextMenu}
      >
        {score}
      </div>
      {/* <span className='text-xs'>{label}</span> */}
    </div>
  )
}
export function UseStateTogetherWPUVDemo() {
  const [, setMyScore, scoresByUser] = useStateTogetherWithPerUserValues<number>('useStateTogetherWithValuesPerUser-demo', 0)

  const increment = () => setMyScore((p) => p + 1)
  const reset = () => setMyScore(0)

  const myId = useViewId()
  return (
    <div className='flex flex-col items-center gap-2 mx-2'>
      <div className='flex gap-5 flex-wrap'>
        {Object.entries(scoresByUser).map(([userId, score]) => {
          const clickable = userId === myId
          return (
            <Score
              key={userId}
              // label={viewId}
              score={score}
              clickable={clickable}
              onClick={() => clickable && increment()}
              onContextMenu={(e) => {
                if (clickable) {
                  e.preventDefault()
                  reset()
                }
              }}
            />
          )
        })}
      </div>
      <p style={{ color: '#888888', fontSize: '0.7rem' }}>Right click to reset to zero</p>
    </div>
  )
}
