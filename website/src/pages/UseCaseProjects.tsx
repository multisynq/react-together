import LinkSpan from '@components/ui/LinkSpan'
import UseCaseThumbNail from '@components/ui/UseCaseThumbNail'
import gitProfileImage from '@images/GitProfile/image.png'
import headerGraphic from '@images/useCaseGraphic.svg'

const PROJECT_BASE_URL = 'https://taikai.network'

type Author = {
  userName: string
  profileImage: string
}

type Project = {
  name: string
  taikaiRoute: string
  projectRoute: string
  description: string
  authors: Author[]
}

export function UseCaseProject() {
  const exampleProjects: Project[] = [
    {
      name: 'Project 1',
      taikaiRoute: 'taikaiRoute',
      projectRoute: 'projectRoute',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      authors: [
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
      ],
    },
    {
      name: 'Project 1',
      taikaiRoute: 'taikaiRoute',
      projectRoute: 'projectRoute',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      authors: [
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
      ],
    },
    {
      name: 'Project 1',
      taikaiRoute: 'taikaiRoute',
      projectRoute: 'projectRoute',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      authors: [
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
      ],
    },
  ]

  const GitProfile = ({ userName, imageSource }: { userName: string; imageSource: string }) => (
    <a href={`https://github.com/${userName}`}>
      <div className='bg-gray-600 rounded-3xl h-[2rem] w-[2rem] border border-gray-800 overflow-hidden'>
        <img src={imageSource} alt={`${userName}'s GitHub profile`} />
      </div>
    </a>
  )

  const Header = () => (
    <div className='h-[18rem] w-full bg-blue-50 flex items-center 2xl:justify-end overflow-hidden border-b-2 border-gray-800'>
      <div className='flex flex-col gap-2 ml-[1.5rem] md:ml-[8rem] w-2/3 2xl:w-2/3 2xl:ml-0'>
        <span>Use Case</span>
        <h2>Developed with React Together</h2>
      </div>
      <div className='w-1/3 2xl:w-1/4 flex h-full justify-start 2xl:justify-end'>
        <div className='h-full aspect-video'>
          <img src={headerGraphic} className='w-full h-full' alt='Use case graphic' />
        </div>
      </div>
    </div>
  )

  const ProjectCard = ({ name, description, authors, taikaiRoute, projectRoute }: Project) => (
    <div className='flex flex-col'>
      {/* ---THUMBNAIL IMAGE--- */}
      <UseCaseThumbNail urlLink={`${PROJECT_BASE_URL}/${projectRoute}`} imageSource={headerGraphic} />
      {/* ---PROJECT DESCRIPTION--- */}
      <div className='flex flex-col gap-2 mx-4'>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold m-0 font-poppins tracking-tight'>{name}</span>
          <span className='text-sm mt-2'>
            {description} <LinkSpan to={taikaiRoute} text='Learn More' />
          </span>
        </div>
        <div className='flex gap-2'>
          {authors.map((m, index) => (
            <GitProfile key={index} userName={m.userName} imageSource={m.profileImage} />
          ))}
        </div>
      </div>
    </div>
  )

  const ProjectList = () => (
    <div className='w-full px-[2rem] sm:px-[2rem] md:px-[4rem] max-w-[84rem] flex items-center justify-center py-[3rem] flex-col'>
      <div className='grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
        {exampleProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  )

  return (
    <div className='w-full bg-gray-50'>
      <div className='w-full flex justify-center flex-col items-center'>
        <Header />
        <ProjectList />
      </div>
    </div>
  )
}
