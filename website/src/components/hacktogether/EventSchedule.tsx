interface Event {
  time: string
  event: string
}

const fridaySchedule: Event[] = [
  { time: '@ 09:00 - 10:30', event: 'Check-in & Team formation' },
  { time: '@10:45 - 11:00', event: 'Welcome Address & Event Kickoff' },
]

const saturdaySchedule: Event[] = [
  { time: '@12:00', event: 'Check-in' },
  { time: '@12:00', event: 'Check-in' },
]

function EventContainer({ time, event }: Event) {
  return (
    <div className='flex flex-col bg-white p-2 gap-2 px-4 py-2 rounded-xl border border-gray-800 shadow-lineStyleDark'>
      <span className='font-poppins font-bold'>{time}</span>
      <span className='font-poppins'>{event}</span>
    </div>
  )
}

function DailyEvent({ day, schedule, color }: { day: { name: string; number: string }; schedule: Event[]; color: string }) {
  return (
    <section className={`w-1/2 flex flex-col gap-2 px-4 py-2 border border-gray-800 rounded-2xl shadow-lineStyleDark ${color}`}>
      <div className='flex flex-col gap-0'>
        <h4 className='' style={{ fontFamily: 'poppins', padding: '0', margin: '0', fontSize: '32px' }}>
          {day.name}
        </h4>
        <label className='' style={{ fontFamily: 'poppins', padding: '0', margin: '0', fontSize: '32px' }}>
          {day.number}
        </label>
      </div>
      {schedule.map((e, index) => (
        <EventContainer key={index} time={e.time} event={e.event} />
      ))}
    </section>
  )
}

export default function EventSchedule() {
  return (
    <div className='flex flex-col w-full px-4'>
      <h3 style={{ fontFamily: 'poppins', fontSize: '2rem' }}>November 2024</h3>
      <div className='flex gap-2 pt-4'>
        <DailyEvent day={{ name: 'Saturday', number: '11' }} schedule={fridaySchedule} color='bg-orange-300' />
        <DailyEvent day={{ name: 'Sunday', number: '12' }} schedule={saturdaySchedule} color='bg-yellow-300' />
      </div>
    </div>
  )
}
