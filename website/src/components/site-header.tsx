import { NavLink } from 'react-router-dom'

import { siteConfig } from '@/config'
import { Icons, MainNav } from '@components'
// import { CommandMenu } from '@components'
import { cn } from '@utils'
import { MobileNavToggle } from './MobileNavToggle'

import { buttonVariants } from '@shadcn/button'

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 w-full border-b-2 border-b-blue-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
      {/* <div className='container flex h-14 max-w-[92rem] items-center padding-0'> */}
      <div className='flex h-14 items-center padding-0 mx-10 overflow-x-auto'>
        <MobileNavToggle />
        <MainNav />
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          {/* <div className='w-full flex-1 md:w-auto md:flex-none'>{<CommandMenu /> </div> */}
          <nav className='flex items-center'>
            <NavLink to={siteConfig.links.github} target='_blank' rel='noreferrer' className={'text-primary hover:text-gray-600 '}>
              <div className={cn(buttonVariants({ variant: 'ghost' }), 'w-9 px-0')}>
                <Icons.gitHub className='h-4 w-4' />
                <span className='sr-only'>GitHub</span>
              </div>
            </NavLink>
            <NavLink to={siteConfig.links.twitter} target='_blank' rel='noreferrer' className={'text-primary hover:text-gray-600 '}>
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
