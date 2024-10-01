import multisynqLogo from '@images/blue.png'
import gamingHubLogo from '@images/gaming_hub_logo.jpg'
import hackerSchoolLogo from '@images/hackerschool_logo.png'
import neetiLogo from '@images/neeti_logo.jpg'

interface PartnerIconProps {
  src: string
  url?: string
  alt?: string
}

function PartnerIcon({ url, src, alt }: PartnerIconProps) {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer' className={url ? 'cursor-pointer' : 'cursor-auto'}>
      <div className='flex items-center justify-center border border-gray-800 bg-white rounded-xl w-full px-[4rem] py-[1.5rem] shadow-lineStyleDark max-w-[34rem] '>
        <div className='flex h-[6rem] w-full'>
          <div className='w-full h-full flex items-center justify-center'>
            <img src={src} alt={alt} className='h-[4rem] w-auto object-contain' />
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
  // Host partner
  // {
  //   src: null, // We need to find a horizontal logo...
  //   url: 'https://www.hood.pt/',
  // },
  // Community Partners
]

const communityPartners = [
  {
    src: neetiLogo,
    url: 'https://neeti.tecnico.ulisboa.pt/',
    alt: 'NEETI',
  },
  {
    src: hackerSchoolLogo,
    url: 'https://linktr.ee/hackerschool_ist',
    alt: 'Hacker School',
  },
  {
    src: gamingHubLogo,
    alt: 'Gaming Hub',
  },
  // PENDING:
  // BUL, SULX, Startup Portugal, Women in Tech Portugal, NEIIST, GameDev, 42 Lisbon, LeWagon, In-Nova, Novae, JEs todas
]

export default function Partners() {
  return (
    <>
      <div className='flex flex-col align-items-center justify-content-between gap-8'>
        {partners.map((p) => (
          <PartnerIcon key={p.url} url={p.url} src={p.src} alt={p.alt} />
        ))}
        {communityPartners.map((p) => (
          <PartnerIcon key={p.url} url={p.url} src={p.src} alt={p.alt} />
        ))}
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
