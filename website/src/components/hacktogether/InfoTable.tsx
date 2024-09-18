import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'

const tableInfo = [
  {
    title: 'Web of Tomorrow',
    description:
      "Shape the future by crafting immersive web experiences that connect people in exciting, meaningful ways. Whether it's building tools for collaboration or interactive games, you’ll be part of transforming how we engage online.",
  },
  {
    title: 'Innovative Ideas Welcome',
    description:
      'Got a wild, out-of-the-box concept? This is your chance to bring it to life! We encourage fresh perspectives and groundbreaking ideas that push the boundaries of what’s possible on the web.',
  },
  {
    title: 'Beginner-Friendly Tools',
    description:
      'Don’t worry if coding isn’t your strength! React Together is designed to be intuitive and accessible. You’ll find everything you need in our Documentation, with step-by-step guides to help you get started quickly and easily.',
  },
  {
    title: 'Push Boundaries',
    description:
      'Reimagine online interaction with innovative solutions that break away from the ordinary. This hackathon is all about experimentation and challenging the traditional ways we connect on the web.',
  },
  // {
  //   title: 'Build the Next Big Thing',
  //   description:
  //     'Your project could be the one that changes how we all experience the internet. With the right idea and execution, you have the potential to create something that could leave a lasting impact on the digital world.',
  // },
]

function TableContent({ title, description }) {
  return (
    <div className='flex flex-col'>
      <div className='w-full border-y border-neutral-800 px-6 py-2 bg-white'>
        <span className='text-lg font-bold tracking-tight'>- {title}</span>
      </div>
      <div className='w-full pt-3 pb-6 px-8 bg-white'>
        <span className='text-sm' style={{ lineHeight: '1' }}>
          {description}
        </span>
      </div>
    </div>
  )
}

export default function InfoTable() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div className='flex flex-col gap-[3rem] md:flex-row'>
      <div data-aos='fade-up' className='px-4'>
        <div>
          <span className='font-semibold text-2xl tracking-tight text-center md:text-left md:text-3xl'>
            Get ready to reshape the internet at HackTogether!
          </span>
        </div>
        <div>
          <p className='mt-3 font-light text-sm text-center mx-2 md:text-left md:text-md md:mx-0'>
            {`Join us for a weekend of hacking! `}
            <HashLink smooth to='#register'>
              <span className='font-bold text-blue-600'>Sign up</span>
            </HashLink>
            {` now and let's revolutionize the internet… Together!`}
          </p>
        </div>
      </div>
      <div className='flex flex-col border border-neutral-800 rounded-xl overflow-hidden shadow-lineStyleDark'>
        {tableInfo.map((info, index) => (
          <TableContent key={index} title={info.title} description={info.description} />
        ))}
      </div>
    </div>
  )
}
