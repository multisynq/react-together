import { Mail } from 'lucide-react'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'

function EventDetails() {
  return (
    <div className='p-4'>
      {/* This information may be only in the banner, maybe we don't need to have it here as well
      Unless having this information in a readable format helps increase SEO?*/}
      <p>Dates: 9 and 10th November</p>
      <p>Location: Lisbon (Venue TBA)</p>
      <p>Prize pool: 4,000 USDT</p>
      <p>
        Limited to 100 seats. <a href=''>Save your seat now!!</a>
      </p>
      <Divider />
      <h3 className='text-xl font-semibold mb-2'>Get ready to reshape the internet at HackTogether!</h3>
      <ul className='list-disc pl-5 space-y-2'>
        <li>Dive into React Together to build interactive online experiences</li>
        <li>Craft the web of tomorrow – where being online means being connected in new ways</li>
        <li>Bring your wildest concepts and most innovative ideas</li>
        <li>Don't worry about coding skills – React Together is super easy to use</li>
        <li>Push boundaries and reimagine online interaction</li>
        <li>Create the next big thing that changes how we all use the internet</li>
      </ul>
      <p className='mt-3 font-semibold'>Join us for a weekend of hacking! Sign up now and let's revolutionize the internet… Together!</p>
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
            <span className='text-2xl font-bold'>{value}</span>
            <p className='mt-1'>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RegistrationForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className='p-4'>
      <Button type='submit' disabled label='Register now!' tooltip='Registrations open October 4th, 2024' />
      <p>Registrations open on October 4th, 2024. Save your spot now by pre-registering!</p>
      <div className='p-inputgroup'>
        <InputText placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type='submit' label='Pre-register' />
      </div>
    </form>
  )
}

function Partners() {
  return (
    <div className='p-4'>
      <h3>Partners</h3>
      <div className='flex align-items-center justify-content-between mt-4'>
        <Image src='/api/placeholder/100/50' alt='Multisynq logo' width='100' />
        <Button
          label='Become a Partner'
          className='p-button-outlined'
          onClick={() => (window.location.href = 'mailto:hacktogether@multisynq.io?subject=I would like to become a partner!')}
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
            <Image src='/api/placeholder/200/100' alt='Event Banner' width='200' />
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
              label='Contact Us'
              icon={<Mail className='mr-2' />}
              onClick={() => (window.location.href = 'mailto:hacktogether@multisynq.io')}
              className='p-button-text'
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
