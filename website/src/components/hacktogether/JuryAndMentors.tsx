import AfonsoGoncalves from '@images/people/AfonsoGoncalves.jpeg'
import ElijahLeeh from '@images/people/ElijahLee.jpg'
// import AranLunzer from '@images/people/AranLunzer.jpeg'
import CharlesPoole from '@images/people/CharlesPoole.png'
import DavidSmith from '@images/people/DavidSmith.png'
import JoaoSantos from '@images/people/JoaoSantos.jpeg'
import JohnPayne from '@images/people/JohnPayne.jpg'
import KenLane from '@images/people/KenLane.jpeg'
import MaximLegg from '@images/people/MaximLegg.png'
import MiguelMatos from '@images/people/MiguelMatos.jpeg'
import SandraLeonor from '@images/people/SandraLeonor.jpeg'
import VanessaFreudenberg from '@images/people/VanessaFreudenberg.jpg'
import YoshikiOhshima from '@images/people/YoshikiOhshima.jpg'
import YuliiaBilyk from '@images/people/YuliiaBilyk.jpeg'
import 'primeicons/primeicons.css'

interface Person {
  img: string
  name: string
  company?: string
  profileUrl?: string | null
  companyUrl?: string
}

const people: Person[] = [
  {
    name: 'John Payne',
    img: JohnPayne,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/johnpayne',
    companyUrl: 'https://www.multisynq.io',
  },
  {
    name: 'David Smith',
    img: DavidSmith,
    company: 'Multisynq.io',
    profileUrl: 'https://en.wikipedia.org/wiki/David_A._Smith_(computer_scientist)',
    companyUrl: 'https://www.multisynq.io',
  },
  {
    name: 'Vanessa Freudenberg',
    img: VanessaFreudenberg,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/codefrau',
    companyUrl: 'https://www.multisynq.io',
  },
  {
    name: 'Yuliia Bilyk',
    img: YuliiaBilyk,
    company: 'NoDress.Code',
    profileUrl: 'https://www.linkedin.com/in/yuliia-bilyk-winb',
    companyUrl: 'https://nodress.codes/',
  },
  {
    name: 'Ken Lane',
    img: KenLane,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/kenlane33',
    companyUrl: 'https://www.multisynq.io',
  },
  {
    name: 'Maxim Legg',
    img: MaximLegg,
    company: 'Pangea',
    profileUrl: 'https://www.linkedin.com/in/maximlegg/',
    companyUrl: 'https://pangea.foundation/',
  },
  // {
  //   name: 'Aran Lunzer',
  //   img: AranLunzer,
  //   company: 'Multisynq.io',
  //   profileUrl: 'https://www.linkedin.com/in/aran-lunzer-6506221',
  //   companyUrl: 'https://www.multisynq.io',
  // },
  {
    name: 'Yoshiki Ohshima',
    img: YoshikiOhshima,
    profileUrl: 'https://tinlizzie.org/ohshima',
  },
  {
    name: 'Sandra Leonor',
    img: SandraLeonor,
    company: 'Laika Ventures',
    profileUrl: 'https://www.linkedin.com/in/sandra-leonor/',
    companyUrl: 'https://laikaventures.co/',
  },
  {
    name: 'João Santos',
    img: JoaoSantos,
    company: 'Sereneus',
    profileUrl: 'http://x.com/joaointech',
    companyUrl: 'https://www.sereneus.pt/pt',
  },
  {
    name: 'Elijah Lee',
    img: ElijahLeeh,
    company: 'Multisynq.io',
    profileUrl: 'http://www.linkedin.com/in/elijah-lee51',
    companyUrl: 'https://laikaventures.co/',
  },
  {
    name: 'Charles Poole',
    img: CharlesPoole,
    company: 'Multisynq.io',
    profileUrl: 'https://linkedin.com/in/ceedeepee',
    companyUrl: 'https://pangea.foundation/',
  },
  {
    name: 'Miguel Matos',
    img: MiguelMatos,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/miguelmatos99',
    companyUrl: 'https://www.multisynq.io',
  },
  {
    name: 'Afonso Gonçalves',
    img: AfonsoGoncalves,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/afonsocrg',
    companyUrl: 'https://www.multisynq.io',
  },
]

interface HeadshotProps {
  person: Person
}
function Headshot({ person }: HeadshotProps) {
  return (
    <div className='mx-auto'>
      <a href={person.profileUrl} target='_blank' rel='noopener noreferrer' className='flex items-center w-full'>
        <img
          src={person.img}
          className='mx-auto w-32 h-32 md:w-28 md:h-28 object-cover lg:w-52 lg:h-52 border border-gray-300 rounded-lg shadow-lx'
        />
      </a>
      <div className='mx-auto flex flex-col items-center text-center mt-2'>
        <strong className='text-md m-0 lg:text-lg md:text-xl font-medium'>{person.name}</strong>
        {person.company && (
          <a href={person.companyUrl} target='_blank' className={'text-black-500 text-md' + (person.companyUrl ? ' underline' : '')}>
            {person.company}
          </a>
        )}
      </div>
    </div>
  )
}

export default function JuriAndMentors() {
  return (
    <div className='grid items-start justify-center gap-3 grid-cols-2 gap-y-4 lg:gap-x-4 lg:gap-y-12 lg:grid-cols-4'>
      {people.map((p) => (
        <Headshot key={p.name} person={p} />
      ))}
    </div>
  )
}
