import { useEffect, useState } from 'react'
import { Cursors, useNicknames } from 'react-together'

export function Canvas() {
  const [nickname, setNickname] = useNicknames()
  const [localNickname, setLocalNickname] = useState(nickname)

  useEffect(() => {
    setLocalNickname(nickname)
  }, [nickname])
  return (
    <>
      <Cursors useCursorsOptions={{ throttleDelay: 75 }} />
      {/* <div className="fixed bottom-0 left-0 text-sm pl-2">
        {`(${formatNumber(myCursor?.pageX)}, ${formatNumber(myCursor?.pageY)})`}
        <br />
        {`(${formatPercent(myCursor?.percentX)}, ${formatPercent(myCursor?.percentY)})`}
      </div> */}
      <div className="flex flex-col gap-2 bg-white p-2 rounded-md fixed bottom-1 right-1">
        <span className="text-sm font-bold">Nickname:</span>
        <input
          type="text"
          value={localNickname}
          onChange={(e) => setLocalNickname(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-2 py-1 rounded"
          onClick={() => setNickname(localNickname)}
          disabled={localNickname === nickname}
        >
          Set Nickname
        </button>
      </div>
      <div className="w-[1900px] h-[500px] bg-rose-500 rounded m-auto" />
      <div className="w-[100px] h-[1000px] bg-blue-500 rounded m-auto" />
    </>
  )
}

// function formatNumber(number: number | undefined) {
//   if (number === undefined) return 'undefined'
//   return `${number.toFixed(2)}`
// }

// function formatPercent(percent: number | undefined) {
//   if (percent === undefined) return 'undefined'
//   return `${(percent * 100).toFixed(2)}%`
// }
