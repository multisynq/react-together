import { Button } from 'primereact/button'
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
]

function FAQPanel({ question, answer }: { question: string; answer: string }) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleParagraph = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <div
        className={`flex flex-col rounded-2xl overflow-hidden  shadow-lineStyleMedium ${isVisible ? 'bg-indigo-600' : 'bg-indigo-200'} border border-gray-800`}
      >
        <div className='flex justify-between items-center px-4 py-1'>
          <span className={`text-2xl tracking-tight font-poppins ${isVisible ? 'text-white' : 'text-black'}`}>{question}</span>
          <Button icon={isVisible ? 'pi pi-minus' : 'pi pi-plus'} rounded text aria-label='Toggle' onClick={toggleParagraph} />
        </div>
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
