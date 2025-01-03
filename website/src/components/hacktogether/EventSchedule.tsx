import LinkSpan from '@components/ui/LinkSpan'

interface Event {
  time: string
  event: string | React.ReactElement
}

const fridaySchedule: Event[] = [
  { time: '09:00', event: 'Check-in & Team formation' },
  { time: '11:30', event: 'Event Kickoff' },
  {
    time: '12:00',
    event: (
      <span>
        Hacking Begins!!
        <br />
        Ideation session w/ <LinkSpan text='Yuliia' to='https://www.linkedin.com/in/yuliia-bilyk-winb/' />
      </span>
    ),
  },
  // { time: '12:00', event: 'Ideation session w/ Yuliia' },
  { time: '13:00', event: 'Lunch is served' },
  { time: '19:30', event: 'Dinner is served' },
  { time: '23:59', event: 'Midnight Motivational Break' },
]

const saturdaySchedule: Event[] = [
  { time: '07:30', event: 'Breakfast is served' },
  { time: '12:00', event: <strong>Coding Ends!!</strong> },
  { time: '12:30', event: 'Lunch is served' },
  { time: '14:00', event: <strong>Submission deadline</strong> },
  { time: '17:00', event: 'Finalist pitches' },
  { time: '18:30', event: 'Winner announcement & After Party' },
]

function EventContainer({ time, event }: Event) {
  return (
    <div role='listitem' className='flex flex-col bg-white p-2 gap-2 px-4 py-2 rounded-xl border border-gray-800 shadow-lineStyleDark'>
      <span className='font-poppins font-bold'>{`@ ${time}`}</span>
      <span className='font-poppins'>{event}</span>
    </div>
  )
}

function DailyEvent({
  day,
  schedule,
  color,
}: {
  day: { name: string; number: string; shortName: string }
  schedule: Event[]
  color: string
}) {
  return (
    <section className={`w-1/2 flex flex-col gap-2 px-4 py-2 border border-gray-800 rounded-2xl shadow-lineStyleDark ${color}`}>
      <div className='flex flex-col gap-0'>
        <h4
          className='block sm:hidden'
          id={`${day.name} ${day.number}-schedule`}
          style={{ fontFamily: 'poppins', padding: '0', margin: '0', fontSize: '32px' }}
        >
          {day.shortName} {day.number}
        </h4>
        <h4
          className='hidden sm:block'
          id={`${day.name} ${day.number}-schedule`}
          style={{ fontFamily: 'poppins', padding: '0', margin: '0', fontSize: '32px' }}
        >
          {day.name} {day.number}
        </h4>
      </div>
      <div role='list' className='flex flex-col gap-2 my-[1.5rem]'>
        {schedule.map((e, index) => (
          <EventContainer key={index} time={e.time} event={e.event} />
        ))}
      </div>
    </section>
  )
}

export default function EventSchedule() {
  return (
    <div className='flex flex-col w-full px-4 mb-[2rem] sm:mb-[4rem]'>
      <h3 className='mb-2' style={{ fontFamily: 'poppins', fontSize: '2rem' }} id='Novemeber 2024 Event'>
        November 2024
      </h3>
      <div className='flex gap-2 pt-4'>
        <DailyEvent day={{ name: 'Saturday', shortName: 'Sat', number: '9' }} schedule={fridaySchedule} color='bg-orange-300' />
        <DailyEvent day={{ name: 'Sunday', shortName: 'Sun', number: '10' }} schedule={saturdaySchedule} color='bg-yellow-300' />
      </div>
    </div>
  )
}
