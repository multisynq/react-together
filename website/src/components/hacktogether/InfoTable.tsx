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
        ReactTogether is designed to be intuitive and accessible for everyone (
        <Link to='/getting-started' className='bg-white'>
          <span className='font-bold text-blue-600'>try it yourself!</span>
        </Link>
        ). Plus, we, the authors of ReactTogether, will be available to help you bring your ideas to life! Your fresh perspective could be
        the key to the innovation of tomorrow!
      </>
    ),
  },
  {
    title: 'Awarding creativity',
    description: (
      <>
        We’re on the hunt for bold ideas that transform how we experience the internet. So, put on your creative thinking hat, imagine the
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
    <div className='mb-[2rem]'>
      {/* Sticky Header */}
      <div className='flex flex-col gap-8 md:flex-row mt-8'>
        {/* Left column with sticky content */}
        <div className='w-full md:w-1/3'>
          <div className='sticky top-[60px] p-4 bg-lime-100 border border-gray-800 rounded-xl shadow-lineStyleDark'>
            <div>
              <span className='mt-3 font-light '>
                {/* {`Join us for a weekend of fun and hacking! `} */}
                Discover the power of ReactTogether and build interactive web experiences. This hackathon is your opportunity to
                <span className='font-bold'> reimagine the internet</span> as we know it.
                <HashLink smooth to='#register'>
                  <span className='font-bold text-blue-600'>{' Sign up '}</span>
                </HashLink>
                now and let's revolutionize the internet... Together!
              </span>
            </div>
          </div>
        </div>

        {/* Main content (scrollable) */}
        <div className='w-full md:w-2/3 p-4'>
          <div className='flex flex-col border border-neutral-800 rounded-xl overflow-hidden shadow-lineStyleDark'>
            {tableInfo.map((info, index) => (
              <TableContent key={index} title={info.title} description={info.description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
