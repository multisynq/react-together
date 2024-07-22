import { InstallCodeBlock } from '@components/ui/InstallCodeBlock'
import { SeamlesslyAnimation } from '@components/ui/SeamlesslyAnimation'
// import { SeamlesslyAnim } from '../../images/SeamlesslyAnim.svg'

export function PageHeader() {
  const sampleCode1 = `npm i react-together`
  return (
    <div className='flex flex-col items-center max-w-[105rem]'>
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
      <span className='h-8' />
      <div className='flex gap-2'>
        <div className='px-4 py-2 bg-blue-300 text-gray-800 rounded-lg shadow-lineStyle text-center flex items-center justify-center border-[2px] border-gray-700 font-bold'>
          Get Started
        </div>
        <InstallCodeBlock language='javascript' code1={sampleCode1} />
      </div>
      <span className='h-2'></span>
    </div>
  )
}