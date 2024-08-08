// import Link from '@components/ui/Link'

import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className='text-center'>
      <h3>Uh oh, this page has gone on an adventure.</h3>

      <div
        className='w-18 px-2 py-1 bg-blue-400 cursor-pointer text-center rounded-lg text-gray-50 border-[2px] border-gray-700 shadow-lineStyleDark'
        onClick={() => navigate('/', { replace: true })}
      >
        Return to Home Page
      </div>
    </div>
  )
}
