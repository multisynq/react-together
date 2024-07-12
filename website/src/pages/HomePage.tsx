import { HeroDemo } from '../components/sections/HeroDemo'
import { PageHeader } from '../components/sections/PageHeader'
import { FeatureBanner } from '../components/sections/FeatureBanner'
import { InviteBanner } from '../components/sections/InviteBanner'

export function HomePage() {
  return (
    <div className='w-full flex justify-center'>
      <main className='flex min-w-[23.4375rem] px-12 pt-8 pb-16 justify-between items-start self-stretch max-w-[92rem]'>
        <div className='flex flex-col items-center gap-12 flex-1'>
          <PageHeader />
          <HeroDemo />
          <FeatureBanner />
          <FeatureBanner />
          <InviteBanner />
        </div>
      </main>
    </div>
  )
}
