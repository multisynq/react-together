import React from 'react'
import Link from './Link'

interface FooterLink {
  label: string
  url: string
  target?: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerData: FooterSection[] = [
  {
    title: 'General',
    links: [
      { label: 'Home', url: '/' },
      { label: 'Contributing', url: '/contributing' },
      { label: 'Pricing', url: '/pricing' },
      { label: 'Cookie Policy', url: '/cookies' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Get Started', url: '/getting-started' },
      { label: 'Components', url: '/ReactTogether' },
      { label: 'Hooks', url: '/useStateTogether' },
      { label: 'Change Log', url: '/changelog' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Croquet Labs', url: 'https://croquet.io/', target: '_blank' },
      { label: 'Multisynq', url: 'https://multisynq.io/', target: '_blank' },
      { label: 'Github', url: 'https://github.com/multisynq', target: '_blank' },
      { label: 'X/Twitter', url: 'https://x.com/multisynq', target: '_blank' },
    ],
  },
  {
    title: 'Archive',
    links: [{ label: 'Hackathon', url: '/hackathon', target: '_top' }],
  },
]

const FooterNav: React.FC = () => {
  return (
    <div className='grid grid-cols-2 gap-4 p-1 sm:p-2 w-full sm:flex'>
      {footerData.map((section, index) => (
        <div key={index} className='flex flex-col gap-1 text-gray-900 items-center sm:items-start flex-1'>
          {/* <div className='flex w-full justify-between'>
      {footerData.map((section, index) => (
        <div key={index} className='flex flex-col gap-1 text-gray-900'> */}
          <div>
            <div className='w-28 sm:w-auto'>
              <span className='text-sm'>{section.title}</span>
            </div>
            <ul className='flex flex-col'>
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} target={link.target} className='text-xs text-gray-600 hover:underline hover:underline-offset-4'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FooterNav
