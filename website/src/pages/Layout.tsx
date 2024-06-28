import { SiteHeader, SiteFooter } from '@components'

interface AppLayoutProps {
  children?: React.ReactNode
}

function HeroDemo() {
  return <div className='w-full aspect-video bg-blue-500 mt-8'></div>
}

function PageHeader() {
  return (
    <div className='flex flex-col items-center gap-2 max-w-[105rem]'>
      <h1 className='text-center max-w-[49.375rem]'>Bring users together seamlessly</h1>
      <p className='text-center max-w-[32rem] p-2.5'>
        Foster real-time collaboration with our React library, enabling users to interact and work together seamlessly.
      </p>
      <div className='inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg'>Get Started</div>
    </div>
  )
}

function FeatureBanner() {
  return (
    <div className='flex flex-col md:flex-row w-full gap-10 py-8'>
      <div className='flex-1 min-w-0'>
        <h3 className='mb-4'>Feature Title</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
      <div className='flex-1 min-w-0'>
        <div className='w-full aspect-[5/3] bg-gray-200'></div>
      </div>
    </div>
  )
}

function InviteBanner() {
  return (
    <div className='flex flex-col items-center gap-2 max-w-[105rem]'>
      <h2 className='text-center max-w-[49.375rem]'>Bring users together seamlessly</h2>
      <p className='text-center max-w-[32rem] p-2.5'>
        Every contribution, big or small, helps make our documentation better for everyone. Check our Contributing Guidelines to get
        started.
      </p>
      <div className='inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg'>Learn More</div>
    </div>
  )
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className='flex min-w-[23.4375rem] px-12 pt-8 pb-16 justify-between items-start self-stretch'>
        <div className='flex max-w-[105rem] flex-col items-center gap-2 flex-1'>
          <PageHeader />
          <HeroDemo />
          <FeatureBanner />
          <FeatureBanner />
          <InviteBanner />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
