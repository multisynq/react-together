import { Cross2Icon } from '@radix-ui/react-icons'
import { useLocation } from 'react-router-dom'
import { Icons } from '@components'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shadcn'
import DocumentNav from './ui/DocumentNav'
import { useState } from 'react'

export function MobileNavToggle() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  if (!pathname.startsWith('/docs')) {
    return null
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className='sm:hidden'>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='w-9 px-0'>
            <Icons.menu className='h-6 w-6' />
            <span className='sr-only'>Document Navigation Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <Button onClick={closeMenu} variant='ghost' className='w-full flex justify-end p-2'>
            <Cross2Icon className='h-4 w-4' />
            <span className='sr-only'>Close menu</span>
          </Button>
          <DocumentNav />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
