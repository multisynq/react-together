import headerGraphic from '@images/useCaseGraphic.svg'

export function UseCaseProject() {
  const exampleProjects = [
    { name: 'Project 1', description: 'This is a short description for Project 1.' },
    { name: 'Project 2', description: 'This is a short description for Project 2.' },
    { name: 'Project 3', description: 'This is a short description for Project 3.' },
    { name: 'Project 4', description: 'This is a short description for Project 4.' },
    { name: 'Project 5', description: 'This is a short description for Project 5.' },
    { name: 'Project 6', description: 'This is a short description for Project 6.' },
    { name: 'Project 7', description: 'This is a short description for Project 7.' },
    { name: 'Project 8', description: 'This is a short description for Project 8.' },
  ]

  function Header() {
    return (
      <div className='h-[21rem] w-full bg-blue-50 py-[4rem] flex items-center 2xl:justify-end overflow-hidden border-b-2 border-gray-800'>
        <div className='flex flex-col gap-2 ml-[1.5rem] md:ml-[8rem] w-2/3 2xl:w-2/3 2xl:ml-[0rem]'>
          <span>Use Case</span>
          <h2>Developed with React Together</h2>
        </div>
        <div className='w-1/3 2xl:w-1/4'>
          <div className='w-[26rem] h-[24rem]'>
            <img src={headerGraphic} className='w-full h-full' />
          </div>
        </div>
      </div>
    )
  }

  function ProjectCard({ name, description }) {
    return (
      <div className='flex flex-col gap-2'>
        <article className='aspect-video w-full rounded-lg flex flex-col items-center justify-center line-border m-0'></article>
        <div>
          <h3 className='text-lg font-semibold m-0' style={{ margin: '0px' }}>
            {name}
          </h3>
          <p className='text-sm mt-2'>{description}</p>
        </div>
      </div>
    )
  }

  function ProjectList() {
    return (
      <div className='w-full px-[2rem] sm:px-[2rem] md:px-[4rem] max-w-[84rem] flex items-center justify-center py-[3rem] flex-col'>
        <div className='grid gap-6 w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
          {exampleProjects.map((project, index) => (
            <ProjectCard key={index} name={project.name} description={project.description} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-50'>
      <div className='w-full flex justify-center flex-col items-center'>
        <Header />
        <ProjectList />
      </div>
    </div>
  )
}
