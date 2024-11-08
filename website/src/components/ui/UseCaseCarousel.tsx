import imageBackround from '@images/useCaseGraphic.svg'
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import UseCaseThumbNail from './UseCaseThumbNail'

const TAIAKI_BASR_URL = 'taikai.network/'

interface Project {
  title: string
  description: string
  projectLink: string
  thumbnailImage: string
}

export default function UseCaseCarousel() {
  const [projects] = useState<Project[]>([
    {
      title: 'Project 1',
      description: 'Duis aute irure dolor in reprehenderit ',
      projectLink: 'test_1',
      thumbnailImage: imageBackround,
    },
    {
      title: 'Project 2',

      description: 'Duis aute irure dolor in reprehenderit ',
      projectLink: 'test_2',
      thumbnailImage: imageBackround,
    },
    {
      title: 'Project 3',
      description: 'Duis aute irure dolor in reprehenderit ',
      projectLink: 'test_2',
      thumbnailImage: imageBackround,
    },
    {
      title: 'Project 4',
      description: 'Duis aute irure dolor in reprehenderit ',
      projectLink: 'test_4',
      thumbnailImage: imageBackround,
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
        <UseCaseThumbNail urlLink={`${TAIAKI_BASR_URL}${project.projectLink}`} imageSource={project.thumbnailImage} />
        <p className='text-black px-4 leading-tight text-md'>{project.description}</p>
      </>
    )
  }

  const HeaderContent = (
    <div className='flex gap-4 sm:gap-4 items-center justify-between sm:justify-start'>
      <h2>
        Experiencing
        <br className='block sm:hidden' /> Web Together
      </h2>
      <NavLink key={'/use-case'} to='/use-case'>
        <div className='flex items-center justify-center px-4 bg-blue-500 text-white py-2 active-border'>
          <span className='font-poppins font-semibold tracking-tight text-lg'>View All</span>
        </div>
      </NavLink>
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
