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
      { label: 'Contributing', url: '/contributing' },
      { label: 'Pricing', url: '/pricing' },
      { label: 'Examples', url: '/examples' },
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
        <div key={index} className='flex flex-col gap-1 text-gray-900'>
          <span className='text-sm'>{section.title}</span>
          <ul className='flex flex-col'>
            {section.links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} className='text-xs text-gray-600 hover:underline hover:underline-offset-4'>
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
