import { CodeBlock } from '@components/ui/CodeBlock'
import { InstallCodeBlock } from '@components/ui/InstallCodeBlock'
import { SeamlesslyAnimation } from '@components/ui/SeamlesslyAnimation'
// import { SeamlesslyAnim } from '../../images/SeamlesslyAnim.svg'

export function PageHeader() {
  const sampleCode1 = `npm i reactTogether`
  return (
    <div className='flex flex-col items-center gap-2 max-w-[105rem]'>
      <span className='h-8'></span>
      <h1 className='flex text-center'>
        Bring users together{' '}
        <span className='pl-2'>
          <SeamlesslyAnimation />
        </span>
      </h1>
      <p className='text-center max-w-[32rem] text-gray-500'>
        Foster real-time collaboration with our React library, enabling users to interact and work together seamlessly.
      </p>
      <div className='flex gap-1'>
        {/* <div className='inline-block px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg'>Get Started</div> */}
        <InstallCodeBlock language='javascript' code1={sampleCode1} />
      </div>
      <span className='h-4'></span>
    </div>
  )
}
