import { Icons } from '@components'
import { siteConfig } from '@config'
import { cn } from '@utils'
import { NavLink, useLocation } from 'react-router-dom'

const navConfig = [
  { to: '/introduction', label: 'Documentation' },
  // { to: '/docs/components', label: 'Components' },
  // { to: '/hello', label: 'Get Started' },
  { to: siteConfig.links.github, label: 'GitHub', className: 'hidden lg:block' },
]

export function MainNav() {
  const pathname = useLocation().pathname
  return (
    <>
      <div className='mr-4 hidden md:flex w-full justify-between'>
        <NavLink to='/' className='mr-6 flex items-center space-x-2 text-gray-800 hover:text-gray-600 no-underline'>
          <Icons.logo className='h-6 w-6' />
          <span className='hidden font-bold sm:inline-block'>{siteConfig.name}</span>
        </NavLink>
        <nav className='flex items-center gap-4 text-sm lg:gap-6'>
          {navConfig.map(({ to, label, className }) => (
            <NavLink
              key={to}
              {...{
                to,
                className: cn(
                  'transition-colors hover:text-foreground/80',
                  className,
                  pathname === to ? 'text-foreground' : 'text-foreground/60'
                ),
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  )
}
