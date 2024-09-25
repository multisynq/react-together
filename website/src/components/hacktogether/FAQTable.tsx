import { useState } from 'react'

const faqInfo = [
  {
    question: 'What is HackTogether?',
    answer:
      "HackTogether is a 24-hour hackathon that brings together dreamers, entrepreneurs, and developers to reimagine web interaction. Participants will focus on creating innovative solutions that enable real-time collaboration and more intuitive ways to interact online. Our goal is to push the boundaries of what's possible in web browsing and collaboration, making the internet more interactive, user-friendly, and helping people feel more connected when they're online.",
  },
  {
    question: 'Who can attend HackTogether?',
    answer:
      'HackTogether is targeted at creative minds with a hacker spirit (in the classical definition of the word). Anyone with a technical or non-technical profile can apply. In essence, all of those wanting to reimagine and reshape how we interact online are welcome to apply. Applications will be reviewed and approved by the organization.',
  },
  {
    question: 'How are applicants selected?',
    answer:
      "HackTogether curators aim at selecting the best, most participative and motivated, creators and visionaries. For this they rely on what candidates fill in their profiles (their pitches and personal bios). CVs don't matter, please don't paste full CVs as an application pitch. What matters is your potential and your passion for technology, no matter your level of experience.",
  },
  {
    question: 'How much does it cost?',
    answer: 'HackTogether is free for all selected candidates.',
  },
  {
    question: 'Is there food and beverages at the event?',
    answer:
      "Food and drinks will be provided free for all attendees. We'll be providing lunch and there will be random snacks and beverages available 24/7. We will also provide dinner for all hackers.",
  },
  {
    question: 'Will I be able to sleep at the venue for IRL events?',
    answer:
      'Our hackathon limited, first-come, first-serve spaces where attendees can sleep, but keep in mind that this will not be the most comfortable place to sleep. And there will not be any showering facilities at our events.',
  },
  {
    question: 'Can I bring a guest to the event?',
    answer: 'No. All attendees must apply to the event individually.',
  },
  {
    question: "I was selected but can't attend the event, what do I do?",
    answer:
      'Please let us know. Spots are limited and it would be nice if another candidate could go instead. (but no, you cannot choose who that candidate might be).',
  },
  {
    question: 'What can I build during the event?',
    answer:
      'You are allowed to work on any idea you are excited about as long as it is building on top of React Together. This means, the event is open-ended and you are not required to solve any particular problem. Our goal is to help you bring a project you’re excited about to life by providing you with technical help, mentorship, and resources.',
  },
  {
    question: 'Can I start working on my project before the hackathon begins?',
    answer:
      "To ensure fairness, participants should not work on their hackathon projects before the event begins. While teams with existing projects may still participate, they won't be eligible for any prize. However, we encourage all attendees to familiarize themselves with React Together and any other tools they plan to use during the hackathon beforehand.",
  },
  {
    question: 'When will the schedule be available?',
    answer: 'A detailed schedule will be available closer to the event, on our website and in the Hackathon page.',
  },
  {
    question: 'Do I need a team to participate?',
    answer:
      'No, not at all. All participants must register as an individual and optionally form a team after registering, using the hackathon platform. Instructions will be provided after the registration process is complete.',
  },
  {
    question: 'I am interested in partnering, what do I do?',
    answer: 'If you are interested in becoming a partner or sponsoring HackTogether, please contact us at hacktogether@mlutisynq.io.',
  },
  {
    question: 'Still have questions?',
    answer: 'Please reach out to us via email (hacktogether@multisynq.io)',
  },
]

function FAQPanel({ question, answer }: { question: string; answer: string }) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleParagraph = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <div
        className={`flex flex-col rounded-2xl overflow-hidden  shadow-lineStyleDark ${isVisible ? 'bg-indigo-600' : 'bg-indigo-200'} border border-gray-800`}
      >
        <button
          onClick={toggleParagraph}
          className={`flex hover:bg-indigo-300 px-4 py-3 ${isVisible ? 'bg-indigo-600' : 'bg-indigo-200'} gap-4 justify-between`}
        >
          <span className={`text-2xl tracking-tight text-left font-poppins ${isVisible ? 'text-white' : 'text-black'}`}>{question}</span>
          <span className='text-2xl'>{isVisible ? '-' : '+'}</span>
        </button>
        <div className={`flex self-stretch ${!isVisible ? 'hidden' : 'block'} p-1 bg-indigo-50 px-5 pt-3 pb-5`}>
          <p className='text-lg'>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQTable() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 divide-y-0 divide-gray-50/10 px-2'>
      {faqInfo.map((faq, index) => (
        <FAQPanel key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  )
}
