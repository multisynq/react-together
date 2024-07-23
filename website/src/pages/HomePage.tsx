import { FeatureCard } from '@components/ui/FeatureCard'
import { HeroDemo } from '../components/sections/HeroDemo'
import { PageHeader } from '../components/sections/PageHeader'

export function HomePage() {
  return (
    <main className='w-full flex justify-center bg-[radial-gradient(162.17%_100%_at_100%_0%,#EFF6FF_0%,#EFF6FF_23%,#FFF_100%)]'>
      <div className='flex min-w-[23.4375rem] px-12 pt-8 pb-16 justify-between items-start self-stretch max-w-[92rem] w-full'>
        <div className='flex flex-col items-center gap-20 flex-1'>
          <PageHeader />
          <HeroDemo />
          <span className='w-full h-24' />
          <FeatureCard />
        </div>
      </div>
    </main>
  )
}
