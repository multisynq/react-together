import { Mail } from 'lucide-react'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const API_URL = import.meta.env.VITE_API_URL

function SeatInfo() {
  return (
    <p>
      Limited to 100 seats.{' '}
      <HashLink smooth to='#register'>
        Save your seat now!!
      </HashLink>
    </p>
  )
}

function EventDetails() {
  return (
    <div className='p-4'>
      {/* This information may be only in the banner, maybe we don't need to have it here as well
      Unless having this information in a readable format helps increase SEO?*/}
      {/* <p>Dates: 9 and 10th November</p>
      <p>Location: Lisbon (Venue TBA)</p>
      <p>Prize pool: 4,000 USDT</p> */}
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

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const eventDate = new Date('2024-11-09T00:09:00').getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className='border border-black shadow-lineStyleMedium rounded-xl bg-blue-200 overflow-hidden flex flex-col items-center justify-center'>
      <div className='mt-3 mb-2'>
        <span className='text-xl tracking-tight font-semibold mb-3'>Let the Countdown Begin!</span>
      </div>
      <div className='flex border-t border-black bg-white w-full items-center justify-center'>
        <div className='flex justify-between m-2 '>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className='flex flex-col w-[5rem] items-center'>
              <span className='text-lg font-bold'>{value.toString().padStart(2, '0')}</span>
              <p className='text-sm'>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function isEmailValid(email: string): boolean {
  const result = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  return !!result
}

function RegistrationForm() {
  const [email, setEmail] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [showEmailError, setShowEmailError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitEmail = async () => {
    if (!isEmailValid(email)) {
      setShowEmailError(true)
      return
    }

    setIsSubmitting(true)
    try {
      const { hostname } = window.location
      const url = new URL(API_URL)
      url.searchParams.set('action', 'pre_register')
      url.searchParams.set('email', email)
      if (!hostname.match(/\.reacttogether\.(pages\.)?dev$/)) url.searchParams.set('prod', 'true')

      const res = await fetch(url)
      if (res.ok) {
        setEmail('')
        setShowConfirm(true)
        setTimeout(() => setShowConfirm(false), 10000)
      } else throw new Error('Failed to pre-register')
    } catch (error) {
      console.error('Error submitting email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitEmail()
  }

  const handleEnter = (e: React.KeyboardEvent) => {
    setShowEmailError(false)
    if (e.key !== 'Enter') return
    submitEmail()
  }

  return (
    <>
      <div className='flex flex-col items-center bg-blue-200 rounded-xl border-gray-800 border shadow-lineStyleDark overflow-hidden'>
        <div className='flex flex-col items-center mt-3 mb-4'>
          <span className='text-xl'>Limited to 100 seats</span>
          <span className='text-xl'>Save your seat now!</span>
        </div>
        <div className='bg-white border rounded-xl border-gray-800'>
          <a id='register' />
          <form onSubmit={handleSubmit} className='p-4'>
            <div className='w-[20rem]'>
              <p className='text-center'>Registrations open on October 4th, 2024. Save your spot now by pre-registering!</p>
            </div>
            <div className='p-inputgroup'>
              <InputText
                {...{
                  placeholder: 'Email address',
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  onKeyDown: handleEnter,
                  invalid: showEmailError,
                }}
              />
              <Button {...{ type: 'submit', label: 'Pre-register', disabled: isSubmitting }} />
            </div>
            <Button disabled type='submit' label='Register now!' tooltip='Registrations open October 4th, 2024' />
          </form>
          {showEmailError && <p className='text-red-500'>Please insert a valid email</p>}
          {showConfirm && <p className='text-green-500'>Your spot is saved! Thanks for joining our hackathon!!</p>}
        </div>
      </div>
    </>
  )
}

function Partners() {
  return (
    <div className='p-4'>
      <h3>Partners</h3>
      <div className='flex align-items-center justify-content-between mt-4'>
        <Image {...{ src: '/api/placeholder/100/50', alt: 'Multisynq logo', width: '100' }} />
        <Button
          {...{
            label: 'Become a Partner',
            className: 'p-button-outlined',
            onClick: () => (window.location.href = 'mailto:hacktogether@multisynq.io?subject=I would like to become a partner!'),
          }}
        />
      </div>
    </div>
  )
}
function PageCover() {
  return (
    <div className='w-full py-8 bg-blue-50 flex flex-col items-center justify-center gap-5 border-b'>
      <div className='flex flex-col sm:flex-row justify-center'>
        <div className='bg-slate-200 w-[12rem] h-[12rem] items-center justify-center flex flex-col'>
          <h1 className='text-3xl font-bold'>hackTogether</h1>
          <h2> Lisbon 24</h2>
        </div>
        <div className='hidden sm:block bg-red-200 w-[12rem] h-[12rem]'>image</div>
      </div>
      <div className='flex flex-col items-center justify-center gap-1'>
        <span className='tracking-tight'>November 9 - 10, 2024</span>
        <span className='tracking-tight'>Lisbon Portugal</span>
        {/* <span className='tracking-tight font-semibold text-sm'>$4,000 Prize Pool</span> */}
      </div>
      <div className='flex flex-col gap-2 sm:flex-row'>
        <Button label='Register Now' size='small' outlined />
        <span className='tracking-tight text-sm font-light'>Interested in partnering?</span>
      </div>
    </div>
  )
}

function BlockOne() {
  return (
    <div className='px-8 flex flex-col gap-4 items-center'>
      <div className='w-[16rem] flex items-center'>
        <h2 className='text-center'>Build the Future of the Web!</h2>
      </div>
      <p className='text-center tracking-tight'>
        Join the brightest minds in Lisbon for a 24-hour hackathon and build the future of the web. Limited spots, big ideas, and $4,000 in
        prizes await!
      </p>
    </div>
  )
}

export function HackTogetherPage() {
  return (
    <>
      <div className='bg-white w-full'>
        <PageCover />
        {/* <div className='p-grid p-justify-center'> */}
        {/* <div className='p-col-12 p-md-8 p-lg-6'> */}
        {/* <Card> */}
        <div className='flex justify-center flex-col'>
          <div className='h-[3rem]' />
          <BlockOne />
          <div className='h-[3rem]' />

          <div className='px-2 max-w-[80rem]'>
            <div className='text-center'>{/* <Image {...{ src: '/api/placeholder/200/100', alt: 'Event Banner', width: '200' }} /> */}</div>

            <Countdown />
            <EventDetails />

            <RegistrationForm />
            <Divider />
            <Partners />

            <Divider />
            <div className='p-4 text-center'>
              <Button
                {...{
                  label: 'Contact Us',
                  icon: <Mail className='mr-2' />,
                  onClick: () => (window.location.href = 'mailto:hacktogether@multisynq.io'),
                  className: 'p-button-text',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
