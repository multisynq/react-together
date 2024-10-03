import _351Logo from '@images/351_logo.png'
import multisynqLogo from '@images/blue.png'
import buildUpLabsLogo from '@images/build_up_labs_logo.jpg'
import gamingHubLogo from '@images/gaming_hub_logo.jpg'
import hackerSchoolLogo from '@images/hackerschool_logo.png'
import hoodLogo from '@images/hood_logo.png'
import leWagonLogo from '@images/lewagon_logo.png'
import neetiLogo from '@images/neeti_logo.png'
import novaeLogo from '@images/novae_logo.svg'
import uflLogo from '@images/unicornfactorylisboa_logo.png'
import womenInTechLogo from '@images/womenInTech_logo.png'

interface PartnerIconProps {
  src: string
  url?: string
  alt?: string
}

function PartnerIcon({ url, src, alt }: PartnerIconProps) {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer' className={url ? 'cursor-pointer' : 'cursor-auto'}>
      <div className='flex items-center justify-center border border-gray-800 bg-white rounded-xl w-full px-[4rem] py-[1.5rem] shadow-lineStyleDark'>
        <div className='flex h-[6rem] w-full'>
          <div className='w-full h-full flex items-center justify-center'>
            <img src={src} alt={alt} className='h-[4rem] w-auto object-contain' />
          </div>
        </div>
      </div>
    </a>
  )
}

function CommunityPartnerIcon({ url, src, alt }: PartnerIconProps) {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer' className={url ? 'cursor-pointer' : 'cursor-auto'}>
      <div className='flex items-center justify-center border border-gray-800 bg-white rounded-xl w-full px-[1.5rem] py-[2.5rem] shadow-lineStyleDark'>
        <div className='flex w-full'>
          <div className='w-full h-full flex items-center justify-center'>
            <img src={src} alt={alt} className='h-[3rem] w-auto object-contain' />
          </div>
        </div>
      </div>
    </a>
  )
}

const partners = [
  // Not sure where to put Multisynq logo... Having a section just for us seems a little bit weird... Maybe Bounty Partners?
  {
    src: multisynqLogo,
    url: 'https://multisynq.io',
    alt: 'Multisynq',
  },
  {
    src: hoodLogo,
    url: 'https://www.hood.pt/',
    alt: 'Hood',
  },
]

const communityPartners = [
  {
    src: _351Logo,
    url: 'https://351startups.com/',
    alt: '351 Portuguese Startup Association',
  },
  {
    src: neetiLogo,
    url: 'https://neeti.tecnico.ulisboa.pt/',
    alt: 'NEETI',
  },
  {
    src: buildUpLabsLogo,
    url: 'https://builduplabs.com/',
    alt: 'Build Up Labs',
  },
  {
    src: womenInTechLogo,
    url: 'https://www.womenintech.pt/',
    alt: 'Women in Tech Portugal',
  },
  {
    src: leWagonLogo,
    url: 'https://www.lewagon.com/lisbon',
    alt: 'Le Wagon',
  },
  {
    src: uflLogo,
    url: 'https://unicornfactorylisboa.com/',
    alt: 'Unicorn Factory Lisboa',
  },
  {
    src: gamingHubLogo,
    alt: 'Gaming Hub',
  },
  {
    src: hackerSchoolLogo,
    url: 'https://linktr.ee/hackerschool_ist',
    alt: 'Hacker School',
  },
  {
    src: novaeLogo,
    url: 'https://linktr.ee/unovae',
    alt: 'NOVAe',
  },
  // PENDING:
  // SULX, Startup Portugal, Women in Tech Portugal, NEIIST, GameDev, 42 Lisbon, LeWagon, JEs todas
]

export default function Partners() {
  return (
    <>
      <div className='flex flex-col align-items-center justify-content-between gap-8'>
        {partners.map((p) => (
          <PartnerIcon key={p.url} url={p.url} src={p.src} alt={p.alt} />
        ))}
        <div className='flex flex-col gap-8'>
          <div className='flex w-full'>
            <span className='text-3xl font-poppins font-semibold mt-4'>Community</span>
          </div>
          <div className='grid grid-cols-2 gap-4 sm:gap-8'>
            {communityPartners.map((p) => (
              <CommunityPartnerIcon key={p.url} url={p.url} src={p.src} alt={p.alt} />
            ))}
          </div>
        </div>
      </div>

      <div className='text-center text-sm mt-8'>
        Interested in partnering?{' '}
        <a
          href='mailto:hacktogether@multisynq.io?subject=I would like to become a partner!'
          target='_blank'
          className='font-semibold cursor-pointer'
        >
          Reach out to us!
        </a>
      </div>
    </>
  )
}
