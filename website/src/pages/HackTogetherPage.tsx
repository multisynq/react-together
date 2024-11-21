import subtitles from '@assets/multisynq_hackathon_2024.vtt'
import CoverBanner from '@components/hacktogether/CoverBanner'
import EventSchedule from '@components/hacktogether/EventSchedule'
import FAQTable from '@components/hacktogether/FAQTable'
import InfoTable from '@components/hacktogether/InfoTable'
import JuriAndMentors from '@components/hacktogether/JuryAndMentors'
import Partners from '@components/hacktogether/Partners'
import VenueInfo from '@components/hacktogether/VenueInfo'
import ReactPlayer from 'react-player/file'

function SubHeader({ title }: { title: string }) {
  return (
    <div className='w-full my-10'>
      <span className='text-5xl font-medium font-poppins text-black tracking-tighter sm:text-6xl'>{title}</span>
    </div>
  )
}

export function HackTogetherPage() {
  return (
    <div className='w-full bg-blue-50'>
      <CoverBanner />
      <div className='w-full flex justify-center'>
        <div className='w-full  px-[1rem] sm:px-[2rem] md:px-[4rem] lg:px-[0rem] max-w-[60rem] flex items-center justify-center py-[3rem] flex-col'>
          <SubHeader title='About the event ...' />
          <ReactPlayer
            url='https://cdn.multisynq.io/2024/hacktogether/videos/multisynq_hackathon_2024.mp4'
            controls
            width='100%'
            height='100%'
            config={{
              tracks: [
                {
                  kind: 'subtitles',
                  src: subtitles,
                  srcLang: 'en',
                  label: 'English',
                  default: true,
                },
              ],
            }}
          />
          <InfoTable />
          <SubHeader title='Judges, Speakers & Mentors' />
          <JuriAndMentors />
          <SubHeader title='Venue' />
          <VenueInfo />
          <SubHeader title='Schedule' />
          <EventSchedule />
          <SubHeader title='Partners' />
          <Partners />
          <SubHeader title='FAQ' />
          <FAQTable />
        </div>
      </div>
    </div>
  )
}
