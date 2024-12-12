import { Link } from 'react-router-dom'

export function PageHeader() {
  const npmLink = 'https://www.npmjs.com/package/react-together'

  return (
    <div className='flex flex-col items-center max-w-[105rem]'>
      <div className='h-8'></div>
      <h1 className='flex flex-col sm:flex-row items-center gap-2 text-center sm:text-start'>
        {`Bring users together`} <span className='textEffect'>seamlessly</span>
      </h1>
      <div className='h-4'></div>
      <div className='max-w-[32rem] mx-[2rem]'>
        <p className='text-center text-gray-700 sm:text-base'>
          Foster real-time collaboration with our React library, enabling users to interact and work together seamlessly.
        </p>
      </div>
      <span className='h-8' />
      <div className='flex gap-2 flex-col sm:flex-row'>
        <Link to='/getting-started'>
          <div className='px-4 py-2 bg-blue-300 flex justify-center line-border line-border-hover hover:bg-blue-100'>
            <span className='font-semibold text-center'>Getting Started</span>
          </div>
        </Link>
        <a href={npmLink} target='_blank'>
          <div className='flex items-center bg-white px-4 line-border line-border-hover gap-1 h-11 hover:bg-gray-200'>
            <span>
              <p className='font-mono'>npm i react-together</p>
            </span>
          </div>
        </a>
      </div>
      <span className='h-2'></span>
    </div>
  )
}
