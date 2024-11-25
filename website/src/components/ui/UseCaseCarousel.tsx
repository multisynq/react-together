import learnTogether from '@images/projects/learnTogether.png'
import multiPlanner from '@images/projects/multiPlanner.png'
import scratchMapBanner from '@images/projects/scratchMap.png'
import slicrBanner from '@images/projects/slicr.png'
import synqCity from '@images/projects/synqCity.png'
import tripSync from '@images/projects/tripSync.png'

import { Carousel, CarouselResponsiveOption } from 'primereact/carousel'
import { useState } from 'react'
import Link from './Link'

interface Project {
  title: string
  description: string
  projectLink: string
  thumbnailImage: string
  websiteLink: string
}

export default function UseCaseCarousel() {
  const [projects] = useState<Project[]>([
    {
      title: 'Slicr',
      description: 'Collaboratively order food with friends, family & colleagues. Save time, delivery fees & have fun.',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a6b7qy075kbssltzt81ksz/idea',
      thumbnailImage: slicrBanner,
      websiteLink: 'https://react-togather.vercel.app/',
    },
    {
      title: 'ScratchMap',
      description: 'The easiest way to coordinate ad hoc location-based events with groups of people.',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3biszdo07m967do3tlzotpu/idea',
      thumbnailImage: scratchMapBanner,
      websiteLink: 'https://scratch-map.pages.dev/',
    },
    {
      title: 'TripSync',
      description: 'A collaborative trip planning web app designed for seamless multiuser interaction.',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3347i7g05e9ao9a3hq50vsk/idea',
      thumbnailImage: tripSync,
      websiteLink: 'https://hacktogether-ariel.pages.dev/',
    },
    {
      title: 'Synq City',
      description:
        'Stay connected to what’s happening around you in real time. A location-based social network that keeps you in the loop.',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a76znk07z1ao9a6r8y8nje/idea',
      thumbnailImage: synqCity,
      websiteLink: 'https://multisynq-hackathon-frontend.vercel.app/',
    },
    {
      title: 'Multi Planner',
      description: 'An app for collaborative shopping lists and trip planning!',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3bme6jn07h0bssl0zgwri0w/idea',
      thumbnailImage: multiPlanner,
      websiteLink: 'https://deployrepo-a74.pages.dev/',
    },
    {
      title: 'Learn Together',
      description: "A way to bring closer students and teachers, making online classes feel like you're really there.",
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a9cvnf076jbssl3oazlry2/idea',
      thumbnailImage: learnTogether,
      websiteLink: 'https://hack-together.vercel.app/',
    },
  ])

  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '638px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  const projectTemplate = ({ title, description, projectLink, thumbnailImage, websiteLink }: Project) => {
    return (
      <div className='group'>
        <div className='flex flex-col py-5 px-3 gap-4 '>
          <div
            className='aspect-[4/3] flex overflow-hidden relative line-border bg-cover bg-center'
            style={{ backgroundImage: `url(${thumbnailImage})` }}
          >
            <div className='absolute md:top-[-5rem] md:group-hover:top-[0rem] transition-all duration-300 flex right-4'>
              <a href={websiteLink} target='_blank'>
                <div className='bg-blue-500 interactive-border w-full flex px-4 py-1 h-[3rem] items-center rounded-xl m-2 justify-center'>
                  <span className='text-lg font-bold text-center text-white'>Live demo</span>
                </div>
              </a>
            </div>
            <a href={projectLink} target='_blank'>
              <div className='bg-gray-700 border-gray-800 w-full flex px-4 py-1 border-t h-[4rem] absolute bottom-[0rem] md:bottom-[-5rem] md:group-hover:bottom-[0rem] transition-all duration-300'>
                <div className='text-lg font-bold flex items-center text-white'>
                  Learn more!
                  <i className='pi pi-arrow-right ml-2'></i>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className='px-4'>
          <h5 style={{ marginTop: '0px' }}>{title}</h5>
          <p className='text-black leading-tight text-md'>{description}</p>
        </div>
      </div>
    )
  }

  const HeaderContent = (
    // <div className='flex gap-4 sm:gap-4 items-center justify-between sm:justify-start'>
    <div className='flex justify-start w-full'>
      <div className='flex pl-[2rem] gap-5 flex-col sm:flex-row lg:gap-[3rem]'>
        <div className='border px-8 py-4 line-border flex flex-col gap-2 bg-lime-100 justify-center items-center'>
          <h2 style={{ fontWeight: 600, fontSize: '40px', lineHeight: '40px' }}>See Our Examples</h2>
        </div>
        <div className='flex items-center justify-center'>
          <div className='flex flex-col'>
            <span className='text-xl tracking-tight font-medium text-center sm:text-left'>
              The examples below were
              <br className='block sm:hidden' /> developed during <Link to='/hackathon'>HackTogether</Link>.
            </span>
            <span className='text-xl tracking-tight font-medium text-center sm:text-left'>
              See the full list of{' '}
              <Link to='https://taikai.network/multisynq/hackathons/hacktogether/results' target='_blank'>
                projects .
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className='mb-[5rem] flex flex-col w-full gap-[2rem]'>
        {HeaderContent}
        <div className='card w-full flex items-center justify-center'>
          <Carousel
            className='w-[28rem] sm:w-full'
            value={projects}
            numScroll={1}
            numVisible={3}
            responsiveOptions={responsiveOptions}
            itemTemplate={projectTemplate}
          />
        </div>
      </div>
    </>
  )
}
