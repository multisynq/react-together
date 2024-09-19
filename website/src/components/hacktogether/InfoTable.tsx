import Link from '@components/ui/Link'
import 'aos/dist/aos.css'
import { HashLink } from 'react-router-hash-link'

const tableInfo = [
  {
    title: 'Reshape the internet',
    description: (
      <>
        Imagine a world where sharing a website is as simple as sharing your screen, where you can interact with friends on any website,
        just like you do on Google Docs.
        <br />
        <br />
        At this hackathon, we're not just imagining this future — we're building it! Join us to build an online experience beyond your
        wildest dreams!!
      </>
    ),
  },
  {
    title: 'Beginner Friendly',
    description: (
      <>
        ReactTogether is designed to be intuitive and accessible for everyone (<Link to='/getting-started'>try it yourself!</Link>). Plus,
        we, the authors of ReactTogether, will be available to help you bring your ideas to life! Your fresh perspective could be the key to
        the innovation of tomorrow!
      </>
    ),
  },
  {
    title: 'Awarding creativity',
    description: (
      <>
        We’re on the hunt for bold ideas that transform how we experience the internet. So, put on your creative thinking cap, imagine the
        unthinkable, and make it a reality in this hackathon!
      </>
    ),
  },
  {
    title: 'No team? No problem!',
    description: (
      <>
        Don’t have a team yet? No worries! Our team-matching system will connect you with other participants. Who knows? You might just meet
        your future co-founder!
      </>
    ),
  },
]

function TableContent({ title, description }) {
  return (
    <div className='flex flex-col'>
      <div className='w-full border-y border-neutral-800 px-6 py-2 bg-white'>
        <span className='text-lg font-bold tracking-tight'>- {title}</span>
      </div>
      <div className='w-full pt-3 pb-6 px-8 bg-white'>
        <span className='text-sm' style={{ lineHeight: '1' }}>
          {description}
        </span>
      </div>
    </div>
  )
}

export default function InfoTable() {
  return (
    <div className='flex flex-col gap-[3rem] md:flex-row mt-[2rem]'>
      <div className='px-4'>
        {/* <div>
          <span className='font-semibold text-2xl tracking-tight text-center md:text-left md:text-3xl'>
            Get ready to reshape the internet at HackTogether!
          </span>
        </div> */}
        <div>
          <span className='mt-3 font-light'>
            {/* {`Join us for a weekend of fun and hackinghacking! `} */}
            Discover the power of ReactTogether and build interactive web experiences. This hackathon is your opportunity to
            <span className='font-bold'> reimagine the internet</span> as we know it.
            <HashLink smooth to='#register'>
              <span className='font-bold text-blue-600'>{' Sign up '}</span>
            </HashLink>
            now and let's revolutionize the internet... Together!
          </span>
        </div>
      </div>
      <div className='flex flex-col border border-neutral-800 rounded-xl overflow-hidden shadow-lineStyleDark'>
        {tableInfo.map((info, index) => (
          <TableContent key={index} title={info.title} description={info.description} />
        ))}
      </div>
    </div>
  )
}
