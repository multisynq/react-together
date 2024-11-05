import { Button } from 'primereact/button'
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel'
import { useState } from 'react'

interface Project {
  title: string
  backgroundColor: string
}

export default function UseCaseCarousel() {
  const [projects] = useState<Project[]>([
    { title: 'Project 1', backgroundColor: 'bg-blue-200' },
    { title: 'Project 2', backgroundColor: 'bg-green-200' },
    { title: 'Project 3', backgroundColor: 'bg-red-200' },
    { title: 'Project 4', backgroundColor: 'bg-purple-200' },
  ])

  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  const projectTemplate = (project: Project) => {
    return (
      <div
        className={`border-1 surface-border border-round m-2 text-center py-5 px-3 rounded-xl line-border h-[18rem] ${project.backgroundColor}`}
      >
        <h4 className='text-black'>{project.title}</h4>
      </div>
    )
  }

  return (
    <>
      <div className='mb-[5rem] flex flex-col w-full gap-[2rem]'>
        <div className='flex gap-4'>
          <h2>Experiencing Web Together</h2>
          <Button label='View all' />
        </div>
        <div className='card'>
          <Carousel value={projects} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={projectTemplate} />
        </div>
      </div>
    </>
  )
}
