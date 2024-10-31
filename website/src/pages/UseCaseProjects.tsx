function TempCardHolder() {
  return (
    <div className='aspect-video w-full bg-slate-300 rounded-lg flex items-center justify-center'>
      <h3>Project Card</h3>
    </div>
  )
}

export function UseCaseProject() {
  return (
    <div className='w-full bg-blue-50'>
      <div className='w-full flex justify-center flex-col items-center'>
        <div className='h-[24rem] w-full bg-blue-200 px-[4rem] py-[4rem]'>
          <div className='flex flex-col gap-2'>
            <span>Use Case</span>
            <h2>Developed with React Together</h2>
          </div>
        </div>
        <div className='w-full px-[2rem] sm:px-[2rem] md:px-[4rem] max-w-[84rem] flex items-center justify-center py-[3rem] flex-col'>
          <div className='grid gap-4 w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: 12 }).map((_, index) => (
              <TempCardHolder key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
