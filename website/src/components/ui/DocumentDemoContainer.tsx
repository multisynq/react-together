interface DocumentDemoContainerProps {
  children: React.ReactNode
  aspectRatio?: string
  labelText?: string
}
export function DocumentDemoContainer({ children, labelText, aspectRatio = '5 / 3' }: DocumentDemoContainerProps) {
  return (
    <>
      <div
        className='line-border flex items-center justify-center flex-1 relative bg-gray-100 overflow-auto min-w-[23rem] max-w-[30rem]'
        style={{ aspectRatio }}
      >
        {labelText && (
          <div className='rounded-xl absolute py-2 px-4 justify-center items-center border border-gray-500 bottom-2 shadow-lineStyleMedium right-2 bg-blue-100'>
            <p className='mb-0 text-sm text-center font-semibold'>{labelText}</p>
          </div>
        )}
        {children}
      </div>
    </>
  )
}
