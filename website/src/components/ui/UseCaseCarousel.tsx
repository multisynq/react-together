import { Carousel, CarouselResponsiveOption } from 'primereact/carousel'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface Project {
  title: string
  description: string
}

export default function UseCaseCarousel() {
  const [projects] = useState<Project[]>([
    {
      title: 'Project 1',

      description: 'Duis aute irure dolor in reprehenderit ',
    },
    {
      title: 'Project 2',

      description: 'Duis aute irure dolor in reprehenderit ',
    },
    {
      title: 'Project 3',

      description: 'Duis aute irure dolor in reprehenderit ',
    },
    {
      title: 'Project 4',
      description: 'Duis aute irure dolor in reprehenderit ',
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
      <div className=''>
        <div className='group flex flex-col py-5 px-3 gap-4'>
          <div className='border-1 surface-border border-round text-center rounded-xl line-border bg-gray-200 aspect-[4/3] flex overflow-hidden relative'>
            <div className='bg-blue-400 border border-gray-900 w-full flex px-4 py-1 rounded-xl h-[4rem] absolute bottom-[-5rem] group-hover:bottom-[-0.5rem] transition-all duration-300'>
              <div className='text-lg font-bold flex items-center text-white'>
                See Example!
                <i className='pi pi-arrow-right ml-2'></i>
              </div>
            </div>
          </div>
        </div>
        <p className='text-black px-4 leading-tight text-md'>{project.description}</p>
      </div>
    )
  }
  return (
    <>
      <div className='mb-[5rem] flex flex-col w-full gap-[2rem]'>
        <div className='flex gap-4 sm:gap-4 items-center justify-between sm:justify-start'>
          <h2>
            Experiencing
            <br className='block sm:hidden' /> Web Together
          </h2>
          <NavLink key={'/use-case'} to='/use-case'>
            <div className='border border-gray-800 flex items-center line-border justify-center px-4 rounded-3xl bg-blue-500 text-white py-2'>
              <span className='font-poppins font-semibold tracking-tight text-lg'>View All</span>
            </div>
          </NavLink>
        </div>
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
