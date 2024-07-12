import { NavLink } from 'react-router-dom'

import { siteConfig } from '@/config'
import { cn } from '@utils'
import {
  CommandMenu,
  Icons,
  MainNav,
  // MobileNav,
  // ModeToggle,
} from '@components'
import { MobileNavToggle } from './MobileNavToggle'

import { buttonVariants } from '@shadcn/button'

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-[92rem] items-center padding-0'>
        <MobileNavToggle />
        <MainNav />
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <CommandMenu />
          </div>
          <nav className='flex items-center'>
            <NavLink to={siteConfig.links.github} target='_blank' rel='noreferrer' className={'text-gray-800 hover:text-gray-600 '}>
              <div className={cn(buttonVariants({ variant: 'ghost' }), 'w-9 px-0')}>
                <Icons.gitHub className='h-4 w-4' />
                <span className='sr-only'>GitHub</span>
              </div>
            </NavLink>
            <NavLink to={siteConfig.links.twitter} target='_blank' rel='noreferrer' className={'text-gray-800 hover:text-gray-600 '}>
              <div className={cn(buttonVariants({ variant: 'ghost' }), 'w-9 px-0')}>
                <Icons.twitter className='h-3 w-3 fill-current' />
                <span className='sr-only'>Twitter</span>
              </div>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
