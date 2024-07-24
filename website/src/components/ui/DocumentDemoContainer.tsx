export function DocumentDemoContainer({ children, labelText }) {
  return (
    <>
      <div
        className='border-2 border-gray-700 rounded-xl p-2 shadow-lineStyle bg-white flex items-center justify-center flex-1 relative bg-slate-100'
        style={{ aspectRatio: '5 / 3' }}
      >
        {/* <div className='rounded-[90px] absolute py-2 px-4 justify-center items-center bg-blue-600 bottom-2 right-2'> */}
        <div className='rounded-xl absolute py-1 px-2 justify-center items-center border-2 border-gray-500 bottom-2 shadow-lineStyleSecond right-2 bg-blue-100'>
          {/* <p className='text-white mb-0'>Window 1</p> */}
          <p className='mb-0 text-sm text-center font-semibold'>{labelText}</p>
        </div>
        {children}
      </div>
    </>
  )
}
