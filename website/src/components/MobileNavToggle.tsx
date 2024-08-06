import { Icons } from '@components'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@shadcn'
import { useState } from 'react'
import DocumentNav from './ui/DocumentNav'

export function MobileNavToggle() {
  const [isOpen, setIsOpen] = useState(false)

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
          <div className='h-[93vh] overflow-y-auto'>
            <Button onClick={closeMenu} variant='ghost' className='w-full flex justify-end p-2 rounded-xl'>
              <div className='flex w-full justify-between'>
                <p className='text-center font-bold'>Close</p>
                <Cross2Icon className='h-4 w-4' />
                <span className='sr-only'>Close menu</span>
              </div>
            </Button>
            <DocumentNav />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
