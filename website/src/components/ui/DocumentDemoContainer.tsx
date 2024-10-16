export function DocumentDemoContainer({ children, labelText }) {
  return (
    <>
      <div
        className='line-border flex items-center justify-center flex-1 relative bg-slate-100 overflow-auto min-w-[18rem]'
        style={{ aspectRatio: '5 / 3' }}
      >
        <div className='rounded-xl absolute py-1 px-2 justify-center items-center border-2 border-gray-500 bottom-2 shadow-lineStyleMedium right-2 bg-blue-100'>
          <p className='mb-0 text-sm text-center font-semibold'>{labelText}</p>
        </div>
        {children}
      </div>
    </>
  )
}
