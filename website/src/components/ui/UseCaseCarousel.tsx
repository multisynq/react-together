import learnTogether from '@images/projects/learnTogether.png'
import multiPlanner from '@images/projects/multiPlanner.png'
import scratchMapBanner from '@images/projects/scratchMap.png'
import slicrBanner from '@images/projects/slicr.png'
import synqCity from '@images/projects/synqCity.png'
import tripSync from '@images/projects/tripSync.png'

import { Carousel, CarouselResponsiveOption } from 'primereact/carousel'
import { useState } from 'react'
import UseCaseThumbNail from './UseCaseThumbNail'

interface Project {
  title: string
  description: string
  projectLink: string
  thumbnailImage: string
}

export default function UseCaseCarousel() {
  const [projects] = useState<Project[]>([
    {
      title: 'Slicr',
      description: 'Collaboratively order food with friends, family & colleagues. Save time, delivery fees & have fun',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a6b7qy075kbssltzt81ksz/idea',
      thumbnailImage: slicrBanner,
    },
    {
      title: 'ScratchMap',
      description: 'The easiest way to coordinate ad hoc location-based events with groups of people.',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3biszdo07m967do3tlzotpu/idea',
      thumbnailImage: scratchMapBanner,
    },
    {
      title: 'TripSync',
      description: 'A collaborative trip planning web app designed for seamless multi user interaction',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3347i7g05e9ao9a3hq50vsk/idea',
      thumbnailImage: tripSync,
    },
    {
      title: 'Synq City',
      description: "A social network based on your location. Know what's happening around you in real time!",
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a76znk07z1ao9a6r8y8nje/idea',
      thumbnailImage: synqCity,
    },
    {
      title: 'Multi Planner',
      description: 'An app for collaborative shopping lists and trip planning!',
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3bme6jn07h0bssl0zgwri0w/idea',
      thumbnailImage: multiPlanner,
    },
    {
      title: 'Learn Together',
      description: "A way to bring closer students and teachers, making online classes feel like you're really there",
      projectLink: 'https://taikai.network/multisynq/hackathons/hacktogether/projects/cm3a9cvnf076jbssl3oazlry2/idea',
      thumbnailImage: learnTogether,
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

  const projectTemplate = (project: Project) => {
    return (
      <>
        <UseCaseThumbNail urlLink={project.projectLink} imageSource={project.thumbnailImage} />
        <p className='text-black px-4 leading-tight text-md'>{project.description}</p>
      </>
    )
  }

  const HeaderContent = (
    <div className='flex gap-4 sm:gap-4 items-center justify-between sm:justify-start'>
      <h2>Examples</h2>
      {/* <h2>
        Experiencing
        <br className='block sm:hidden' /> Web Together
      </h2>
      <NavLink key={'/examples'} to='/examples'>
        <div className='flex items-center justify-center px-4 bg-blue-500 text-white py-2 active-border'>
          <span className='font-poppins font-semibold tracking-tight text-lg'>View All</span>
        </div>
      </NavLink> */}
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
