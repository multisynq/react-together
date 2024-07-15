import { CodeBlock } from '@components/ui/CodeBlock'
import { InstallCodeBlock } from '@components/ui/InstallCodeBlock'

export function PageHeader() {
  const sampleCode1 = `npm i reactTogether`
  return (
    <div className='flex flex-col items-center gap-2 max-w-[105rem]'>
      <span className='h-20'></span>
      <h1 className='text-center max-w-[49.375rem]'>
        Bring users together <span className='font-thin'>seamlessly.</span>
      </h1>
      <p className='text-center max-w-[32rem] p-2.5'>
        Foster real-time collaboration with our React library, enabling users to interact and work together seamlessly.
      </p>
      <div className='flex gap-2'>
        <div className='inline-block px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg'>Get Started</div>
        <InstallCodeBlock language='javascript' code1={sampleCode1} />
      </div>
      <span className='h-8'></span>
    </div>
  )
}
