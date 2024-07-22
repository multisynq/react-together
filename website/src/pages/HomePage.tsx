import { HeroDemo } from '../components/sections/HeroDemo'
import { PageHeader } from '../components/sections/PageHeader'
import { FeatureBanner } from '../components/sections/FeatureBanner'
import { InviteBanner } from '../components/sections/InviteBanner'
import { FeatureCard } from '@components/ui/FeatureCard'

export function HomePage() {
  return (
    <main className='w-full flex justify-center bg-[radial-gradient(162.17%_100%_at_100%_0%,#EFF6FF_0%,#EFF6FF_23%,#FFF_100%)]'>
      <div className='flex min-w-[23.4375rem] px-12 pt-8 pb-16 justify-between items-start self-stretch max-w-[92rem] w-full'>
        <div className='flex flex-col items-center gap-8 flex-1'>
          <PageHeader />
          {/* <HeroDemo /> */}
          <FeatureCard />
        </div>
      </div>
    </main>
  )
}