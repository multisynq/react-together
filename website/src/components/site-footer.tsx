import { siteConfig } from '@config'

export function SiteFooter() {
  return (
    <footer className='py-6 md:px-8 md:py-0 bg-white'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
        <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left text-gray-800'>
          Built by{' '}
          <a href={siteConfig.links.croquet} target='_blank' rel='noreferrer' className='font-medium underline underline-offset-4'>
            Croquet Labs
          </a>{' '}
          for{' '}
          <a href={siteConfig.links.multisynq} target='_blank' rel='noreferrer' className='font-medium underline underline-offset-4'>
            Multisynq
          </a>
          . The source code is available on{' '}
          <a href={siteConfig.links.github} target='_blank' rel='noreferrer' className='font-medium underline underline-offset-4'>
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
