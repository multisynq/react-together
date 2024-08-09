// import Link from '@components/ui/Link'
import { useNavigate } from 'react-router-dom'
import notFoundImage from '../images/pageNotFound.png'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center items-center flex-col gap-6 bg-blue-50 h-[80vh]'>
      {/* <div className='h-[20rem] w-[40rem] bg-blue-300' /> */}
      <img src={notFoundImage} alt='404 Page Not found with compass' className='w-auto h-[12rem] rounded-lg' />
      <h3>Uh oh, this page has gone on an adventure.</h3>

      <span
        className='w-18 px-5 py-2 bg-blue-600 cursor-pointer text-center rounded-lg text-neutral-100 border-[2px] line-border hover:bg-blue-100 hover:text-neutral-800 shadow-lineStyleLight'
        onClick={() => navigate('/', { replace: true })}
      >
        <strong>Return to Home Page</strong>
      </span>
    </div>
  )
}
