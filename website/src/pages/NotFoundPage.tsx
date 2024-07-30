import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <h1>
      The page you are looking for was not found. Let's get back{' '}
      <Link to='/' className='cursor-pointer'>
        <em>
          <u>together</u>
        </em>
      </Link>
    </h1>
  )
}
