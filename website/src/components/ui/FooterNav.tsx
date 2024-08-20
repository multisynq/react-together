import React from 'react'

interface FooterLink {
  label: string
  url: string
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
      { label: 'Get Started', url: '/#/getting-started' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Components', url: '/#/ReactTogether' },
      { label: 'Hooks', url: '/#/useStateTogether' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { label: 'Contributing', url: '/#/contributing' },
      { label: 'Pricing', url: '/#/pricing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Croquet Labs', url: 'https://croquet.io/' },
      { label: 'Multisynq', url: 'https://multisynq.io/' },
      { label: 'Github', url: 'https://github.com/multisynq' },
      { label: 'X/Twitter', url: 'https://x.com/multisynq' },
    ],
  },
]

const FooterNav: React.FC = () => {
  return (
    <div className='flex p-2 w-full justify-between'>
      {footerData.map((section, index) => (
        <div key={index} className='flex flex-col gap-2 text-gray-700'>
          <span className='text-sm '>{section.title}</span>
          <ul className='gap-1 flex flex-col pl-2'>
            {section.links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} className='text-xs text-gray-600'>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default FooterNav
