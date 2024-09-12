import { Mail } from 'lucide-react'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const API_URL = import.meta.env.VITE_API_URL

function EventDetails() {
  return (
    <div className='p-4'>
      {/* This information may be only in the banner, maybe we don't need to have it here as well
      Unless having this information in a readable format helps increase SEO?*/}
      <p>Dates: 9 and 10th November</p>
      <p>Location: Lisbon (Venue TBA)</p>
      <p>Prize pool: 4,000 USDT</p>
      <p>
        Limited to 100 seats.{' '}
        <HashLink smooth to='#register'>
          Save your seat now!!
        </HashLink>
      </p>
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
    <div className='p-4' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 className='text-xl font-semibold mb-3'>Event Countdown</h3>
      <div className='flex justify-content-between text-center' style={{ maxWidth: '20rem' }}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className='flex-1 mx-2'>
            <span className='text-2xl font-bold'>{value.toString().padStart(2, '0')}</span>
            <p className='mt-1'>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
          </div>
        ))}
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
      const response = await fetch(`${API_URL}?action=pre_register&email=${encodeURIComponent(email)}`)
      if (response.ok) {
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
      <a id='register' />
      <form onSubmit={handleSubmit} className='p-4'>
        <Button disabled type='submit' label='Register now!' tooltip='Registrations open October 4th, 2024' />
        <p>Registrations open on October 4th, 2024. Save your spot now by pre-registering!</p>
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
      </form>
      {showEmailError && <p className='text-red-500'>Please insert a valid email</p>}
      {showConfirm && <p className='text-green-500'>Your spot is saved! Thanks for joining our hackathon!!</p>}
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

export function HackTogetherPage() {
  return (
    <div className='p-grid p-justify-center'>
      <div className='p-col-12 p-md-8 p-lg-6'>
        <Card>
          <div className='text-center'>
            <Image {...{ src: '/api/placeholder/200/100', alt: 'Event Banner', width: '200' }} />
            <h1 className='text-3xl font-bold'>HackTogether - Lisbon 24</h1>
          </div>

          <Divider />
          <EventDetails />
          <Divider />
          <Countdown />
          <Divider />
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
        </Card>
      </div>
    </div>
  )
}
