import AranLunzer from '@images/people/AranLunzer.jpeg'
import DavidSmith from '@images/people/DavidSmith.jpeg'
import JoaoSantos from '@images/people/JoaoSantos.jpeg'
import JohnPayne from '@images/people/JohnPayne.jpeg'
import KenLane from '@images/people/KenLane.jpeg'
import MaximLegg from '@images/people/MaximLegg.png'
import MiguelMatos from '@images/people/MiguelMatos.jpeg'
import VanessaFreudenberg from '@images/people/VanessaFreudenberg.jpeg'
import YuliiaBilyk from '@images/people/YuliiaBilyk.jpeg'
import 'primeicons/primeicons.css'

interface Person {
  img: string
  name: string
  company: string
  profileUrl: string | null
}

const people: Person[] = [
  {
    name: 'John Payne',
    img: JohnPayne,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/johnpayne',
  },
  {
    name: 'David Smith',
    img: DavidSmith,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/croquet',
  },
  {
    name: 'Maxim Legg',
    img: MaximLegg,
    company: 'Pangea',
    profileUrl: 'https://www.linkedin.com/in/maximlegg/',
  },
  {
    name: 'Vanessa Freudenberg',
    img: VanessaFreudenberg,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/codefrau',
  },
  {
    name: 'Aran Lunzer',
    img: AranLunzer,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/aran-lunzer-6506221',
  },
  {
    name: 'Ken Lane',
    img: KenLane,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/kenlane33',
  },
  {
    name: 'Miguel Matos',
    img: MiguelMatos,
    company: 'Multisynq.io',
    profileUrl: 'https://www.linkedin.com/in/miguelmatos99',
  },
  {
    img: YuliiaBilyk,
    name: 'Yuliia Bilyk',
    company: 'NoDress.Code',
    profileUrl: 'https://www.linkedin.com/in/yuliia-bilyk-winb',
  },
  {
    img: JoaoSantos,
    name: 'João Santos',
    company: 'Sereneus',
    profileUrl: 'https://www.linkedin.com/in/joaops95',
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
        <p className='text-black-500 text-md'>{person.company}</p>
      </div>
    </div>
  )
}

export default function JuriAndMentors() {
  return (
    <div className='grid items-center justify-center gap-3 grid-cols-2 gap-y-4 lg:gap-x-4 lg:gap-y-12 lg:grid-cols-4'>
      {people.map((p) => (
        <Headshot key={p.name} person={p} />
      ))}
    </div>
  )
}
