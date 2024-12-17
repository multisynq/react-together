import { PricingBanner } from '@components/sections/PricingBanner'
import { FeatureCard } from '@components/ui/FeatureCard'
import { HeroDemo } from '../components/sections/HeroDemo'
import { PageHeader } from '../components/sections/PageHeader'
import UseCaseCarousel from '../components/ui/UseCaseCarousel'

export function HomePage() {
  return (
    <main className='w-full flex justify-center items-center flex-col bg-gradientBackground'>
      <div>
        <div className='flex mt-8 pb-16 justify-between items-start max-w-[92rem] w-full'>
          <div className='flex flex-col items-center flex-1 justify-center'>
            <PageHeader />
            <div className='w-full h-8' />
            <HeroDemo />
            <div className='w-full h-20 sm:h-32' />
            <UseCaseCarousel />
            <FeatureCard />
          </div>
        </div>
      </div>
      <PricingBanner />
    </main>
  )
}
