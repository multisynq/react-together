import { Cursors } from 'react-together'

export function Canvas() {
  return (
    <>
      <Cursors useCursorsOptions={{ throttleTime: 200 }} />
      {/* <div className="fixed bottom-0 left-0 text-sm pl-2">
        {`(${formatNumber(myCursor?.pageX)}, ${formatNumber(myCursor?.pageY)})`}
        <br />
        {`(${formatPercent(myCursor?.percentX)}, ${formatPercent(myCursor?.percentY)})`}
      </div> */}
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
