import { HeroDemo } from '../components/sections/HeroDemo'
import { PageHeader } from '../components/sections/PageHeader'
import { FeatureBanner } from '../components/sections/FeatureBanner'
import { InviteBanner } from '../components/sections/InviteBanner'

export function HomePage() {
  return (
    <main className='flex min-w-[23.4375rem] px-12 pt-8 pb-16 justify-between items-start self-stretch'>
      <div className='flex max-w-[105rem] flex-col items-center gap-2 flex-1'>
        <PageHeader />
        <HeroDemo />
        <FeatureBanner />
        <FeatureBanner />
        <InviteBanner />
      </div>
    </main>
  )
}
