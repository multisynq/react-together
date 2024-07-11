import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@utils'
import { Icons } from '@components'
import { siteConfig } from '@config'

const navConfig = [
  { to: '/docs/get-started/introduction', label: 'Documentation' },
  // { to: '/docs/components', label: 'Components' },
  // { to: '/hello', label: 'Get Started' },
  { to: siteConfig.links.github, label: 'GitHub', className: 'hidden lg:block' },
]

export function MainNav() {
  const pathname = useLocation().pathname
  return (
    <>
      <div className='mr-4 hidden md:flex'>
        <NavLink to='/' className='mr-6 flex items-center space-x-2'>
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
