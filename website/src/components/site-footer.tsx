import { siteConfig } from '@config'
import FooterNav from './ui/FooterNav'

export function SiteFooter() {
  return (
    <footer className='w-full flex items-center justify-center mt-[8rem] pt-[2rem] bg-slate-50'>
      <div className='flex justify-center gap-8 p-6 px-4 sm:px-8 md:px-12 relative w-full max-w-[68rem] items-center flex-col '>
        <FooterNav />
        <div className='w-full'>
          <div>
            <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left text-gray-500'>
              Built by{' '}
              <a href={siteConfig.links.croquet} target='_blank' rel='noreferrer' className='font-medium underline underline-offset-4'>
                Croquet Labs
              </a>{' '}
              for{' '}
              <a href={siteConfig.links.multisynq} target='_blank' rel='noreferrer' className='font-medium underline underline-offset-4'>
                Multisynq
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
