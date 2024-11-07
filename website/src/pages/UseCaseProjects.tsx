import gitProfileImage from '@images/GitProfile/image.png'
import headerGraphic from '@images/useCaseGraphic.svg'

type Member = {
  userName: string
  profileImage: string
}

type Project = {
  name: string
  description: string
  member: Member[]
}

export function UseCaseProject() {
  const exampleProjects: Project[] = [
    {
      name: 'Project 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      member: [
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
      ],
    },
    {
      name: 'Project 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      member: [
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
      ],
    },
    {
      name: 'Project 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      member: [
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
      ],
    },
    {
      name: 'Project 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      member: [
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
      ],
    },
    {
      name: 'Project 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      member: [
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
        { userName: 'aloha-elijah', profileImage: gitProfileImage },
      ],
    },
  ]

  const GitProfile = ({ userName, imageSource }: { userName: string; imageSource: string }) => (
    <a href={`https://github.com/${userName}`}>
      <div className='bg-slate-600 rounded-3xl h-[2rem] w-[2rem] border border-gray-800 overflow-hidden'>
        <img src={imageSource} alt={`${userName}'s GitHub profile`} />
      </div>
    </a>
  )

  const Header = () => (
    <div className='h-[21rem] w-full bg-blue-50 py-[4rem] flex items-center 2xl:justify-end overflow-hidden border-b-2 border-gray-800'>
      <div className='flex flex-col gap-2 ml-[1.5rem] md:ml-[8rem] w-2/3 2xl:w-2/3 2xl:ml-0'>
        <span>Use Case</span>
        <h2>Developed with React Together</h2>
      </div>
      <div className='w-1/3 2xl:w-1/4'>
        <div className='w-[26rem] h-[24rem]'>
          <img src={headerGraphic} className='w-full h-full' alt='Use case graphic' />
        </div>
      </div>
    </div>
  )

  const ProjectCard = ({ name, description, member }: Project) => (
    <div className='flex flex-col gap-2'>
      <article className='aspect-[4/3] w-full rounded-lg flex flex-col justify-start line-border m-0 items-start'>
        {/* Placeholder for additional card content */}
      </article>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <span className='text-lg font-semibold m-0 font-poppins tracking-tight'>{name}</span>
          <span className='text-sm mt-2'>
            {description} <a href={'#'}>Learn more</a> {/* Replace with dynamic link if available */}
          </span>
        </div>
        <div className='flex gap-2'>
          {member.map((m, index) => (
            <GitProfile key={index} userName={m.userName} imageSource={m.profileImage} />
          ))}
        </div>
      </div>
    </div>
  )

  const ProjectList = () => (
    <div className='w-full px-[2rem] sm:px-[2rem] md:px-[4rem] max-w-[84rem] flex items-center justify-center py-[3rem] flex-col'>
      <div className='grid gap-12 w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
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
