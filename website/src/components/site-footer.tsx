import { Icons } from '@components'
import { siteConfig } from '@config'
import FooterNav from './ui/FooterNav'

export function SiteFooter() {
  return (
    <footer className='w-full flex items-center justify-center mt-[8rem] pt-[2rem] bg-slate-50'>
      <div className='flex flex-col sm:flex-row gap-8 p-6 px-4 sm:px-8 md:px-12 relative w-full max-w-[72rem] items-start justify-center'>
        <div className='flex mt-5 w-full justify-center items-center sm:w-1/2 order-2 sm:order-1'>
          <div className='flex flex-col gap-1'>
            <div className='flex gap-2 items-end'>
              <Icons.logo className='h-6 w-6' /> <span className='font-semibold font-sans sm:inline-block text-lg'>{siteConfig.name}</span>
            </div>
            <span className='text-xs md:text-sm text-muted-foreground text-gray-500'>
              Built by{' '}
              <a
                href={siteConfig.links.croquet}
                target='_blank'
                rel='noreferrer'
                className='font-medium hover:underline hover:underline-offset-4 text-black'
              >
                Croquet Labs
              </a>{' '}
              for{' '}
              <a
                href={siteConfig.links.multisynq}
                target='_blank'
                rel='noreferrer'
                className='font-medium hover:underline hover:underline-offset-4 text-black'
              >
                Multisynq
              </a>
              .
            </span>
          </div>
        </div>
        <div className='w-full order-1 sm:order-2'>
          <FooterNav />
        </div>
      </div>
    </footer>
  )
}
