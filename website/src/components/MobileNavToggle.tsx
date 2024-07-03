import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { useLocation } from 'react-router-dom'
import { Icons } from '@components'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shadcn'
import DocumentNav from './ui/DocumentNav'

export function MobileNavToggle() {
  const { pathname } = useLocation()

  if (!pathname.startsWith('/docs')) {
    return null
  }

  return (
    <div className='sm:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='w-9 px-0'>
            <Icons.menu className='h-6 w-6' />
            <span className='sr-only'>Document Navigation Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DocumentNav />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
