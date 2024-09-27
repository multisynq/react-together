interface Event {
  time: string
  event: string
}

const fridaySchedule: Event[] = [
  { time: '09:00 - 10:30', event: 'Check-in & Team formation' },
  { time: '10:45 - 11:00', event: 'Welcome Address & Event Kickoff' },
  { time: '11:00', event: 'Hackathon Officially Begins' },
  { time: '13:00 - 14:00', event: 'Lunch Break (Hacking Continues)' },
  { time: '20:00 - 21:00', event: 'Dinner Break (Hacking Continues)' },
]

const saturdaySchedule: Event[] = [
  { time: '00:00', event: 'Midnight Motivational Break' },
  { time: '08:00', event: 'Breakfast Served' },
  { time: '09:00 - 10:00', event: 'Preparation for Pitches' },
  { time: '10:00 - 12:30', event: 'Initial Round of Pitches and Evaluation' },
  { time: '12:30 - 13:30', event: 'Lunch Break and Judges Deliberation' },
  { time: '13:30 - 15:00', event: 'Final Round of Pitches (Top Teams)' },
  { time: '15:00 - 15:30', event: 'Judges Final Deliberation' },
  { time: '15:30 - 16:30', event: 'Closing Ceremony' },
  { time: '16:30 - 17:00', event: 'Networking and Wrap-up' },
]

function EventContainer({ time, event }: Event) {
  return (
    <div role='listitem' className='flex flex-col bg-white p-2 gap-2 px-4 py-2 rounded-xl border border-gray-800 shadow-lineStyleDark'>
      <span className='font-poppins font-bold'>{`@ ${time}`}</span>
      <span className='font-poppins'>{event}</span>
    </div>
  )
}

function DailyEvent({ day, schedule, color }: { day: { name: string; number: string }; schedule: Event[]; color: string }) {
  return (
    <section className={`w-1/2 flex flex-col gap-2 px-4 py-2 border border-gray-800 rounded-2xl shadow-lineStyleDark ${color}`}>
      <div className='flex flex-col gap-0'>
        <h4 id={`${day.name} ${day.number}-schedule`} style={{ fontFamily: 'poppins', padding: '0', margin: '0', fontSize: '32px' }}>
          {day.name}
        </h4>
        <label className='' style={{ fontFamily: 'poppins', padding: '0', margin: '0', fontSize: '32px' }}>
          {day.number}
        </label>
      </div>
      <div role='list' className='flex flex-col gap-2'>
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
        <DailyEvent day={{ name: 'Saturday', number: '11' }} schedule={fridaySchedule} color='bg-orange-300' />
        <DailyEvent day={{ name: 'Sunday', number: '12' }} schedule={saturdaySchedule} color='bg-yellow-300' />
      </div>
    </div>
  )
}
