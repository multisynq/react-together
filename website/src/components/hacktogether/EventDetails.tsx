import { Divider } from 'primereact/divider'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export default function EventDetails() {
  return (
    <div className='p-4'>
      {/* This information may be only in the banner, maybe we don't need to have it here as well
      Unless having this information in a readable format helps increase SEO?*/}
      {/* <p>Dates: 9 and 10th November</p>
      <p>Location: Lisbon (Venue TBA)</p>
      <p>Prize pool: $4,000</p> */}
      <Divider />
      <h3 className='text-xl font-semibold mb-2'>Get ready to reshape the internet at HackTogether!</h3>
      <ul className='list-disc pl-5 space-y-2'>
        <li>Dive into React Together to build interactive online experiences</li>
        <li>Craft the web of tomorrow – where being online means being connected in new ways</li>
        <li>Bring your wildest concepts and most innovative ideas</li>
        <li>
          Don't worry about coding skills – React Together is super easy to use. Really, checkout our{' '}
          <Link to='/getting-started'>Documentation</Link>
        </li>
        <li>Push boundaries and reimagine online interaction</li>
        <li>Create the next big thing that changes how we all use the internet</li>
      </ul>
      <p className='mt-3 font-semibold'>
        Join us for a weekend of hacking!{' '}
        <HashLink smooth to='#register'>
          Sign up now
        </HashLink>{' '}
        and let's revolutionize the internet… Together!
      </p>
    </div>
  )
}
