import multisynqLogo from '@images/blue.png'
import _351Logo from '@images/partners/351_logo.png'
import _42LisbonLogo from '@images/partners/42Lisboa_logo.svg'
import buildUpLabsLogo from '@images/partners/build_up_labs_logo.jpg'
import dominosLogo from '@images/partners/Dominos.png'
import eatTastyLogo from '@images/partners/eatTasty.png'
import gamingHubLogo from '@images/partners/gaming_hub_logo.jpg'
import growincLogo from '@images/partners/growinc_logo.png'
import hackerSchoolLogo from '@images/partners/hackerschool_logo.png'
import hoodLogo from '@images/partners/hood_logo.png'
import jdcLogo from '@images/partners/jdc_logo.png'
import jeknowledgeLogo from '@images/partners/jeKnowledge_logo.png'
import junitecLogo from '@images/partners/junitec.png'
import leWagonLogo from '@images/partners/lewagon_logo.png'
import lisboaJSLogo from '@images/partners/LisboaJS.png'
import moveToFundaoLogo from '@images/partners/moveToFundao.jpg'
import neetiLogo from '@images/partners/neeti_logo.png'
import neiistLogo from '@images/partners/neiist_logo.png'
import novaeLogo from '@images/partners/novae_logo.svg'
import pangeaLogo from '@images/partners/pangea_logo.png'
import serraLogo from '@images/partners/serra.png'
import starJeLogo from '@images/partners/starJe_logo.png'
import startupPortugalLogo from '@images/partners/startupportugal_logo.svg'
import techstarsStartupDigestLogo from '@images/partners/techstarsStartupDigest_logo.jpg'
import uflLogo from '@images/partners/unicornfactorylisboa_logo.png'
import womenInTechLogo from '@images/partners/womenInTech_logo.png'

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

const foodPartners = [
  {
    src: dominosLogo,
    url: 'https://www.dominospizza.pt/',
    alt: "Domino's Pizza",
  },
  {
    src: eatTastyLogo,
    url: 'https://eattasty.pt/home',
    alt: 'Eat Tasty',
  },
]

function zipArrays(arr1, arr2) {
  const maxLength = Math.max(arr1.length, arr2.length)
  const result = []

  for (let i = 0; i < maxLength; i++) {
    if (i < arr1.length) result.push(arr1[i])
    if (i < arr2.length) result.push(arr2[i])
  }

  return result
}

const startupPartners = [
  {
    src: pangeaLogo,
    url: 'https://pangea.foundation/',
    alt: 'Pangea',
  },
  {
    src: lisboaJSLogo,
    url: 'https://www.meetup.com/lisboajs/',
    alt: 'LisboaJS',
  },
  {
    src: _351Logo,
    url: 'https://351startups.com/',
    alt: '351 Portuguese Startup Association',
  },
  {
    src: startupPortugalLogo,
    url: 'https://startupportugal.com/',
    alt: 'Startup Portugal',
  },
  {
    src: techstarsStartupDigestLogo,
    url: 'https://read.letterhead.email/techstars-portugal',
    alt: 'Techstars Startup Digest Portugal',
  },
  {
    src: womenInTechLogo,
    url: 'https://www.womenintech.pt/',
    alt: 'Women in Tech Portugal',
  },
  {
    src: serraLogo,
    url: 'https://twitch.tv/serra',
    alt: 'twitch.tv/serra',
  },
  {
    src: buildUpLabsLogo,
    url: 'https://builduplabs.com/',
    alt: 'Build Up Labs',
  },
  {
    src: growincLogo,
    url: 'https://www.growinc.io/lis',
    alt: 'grow.inc SPACES Lisbon',
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
    src: moveToFundaoLogo,
    url: 'https://movetofundao.pt/',
    alt: 'Move to Fundão',
  },
]

const studentPartners = [
  {
    src: neetiLogo,
    url: 'https://neeti.tecnico.ulisboa.pt/',
    alt: 'NEETI',
  },
  {
    src: leWagonLogo,
    url: 'https://www.lewagon.com/lisbon',
    alt: 'Le Wagon',
  },
  {
    src: _42LisbonLogo,
    url: 'https://www.42lisboa.com',
    alt: '42 Lisbon',
  },
  {
    src: neiistLogo,
    url: 'https://neiist.tecnico.ulisboa.pt/',
    alt: 'NEIIST',
  },
  {
    src: jeknowledgeLogo,
    url: 'https://www.jeknowledge.pt/',
    alt: 'JeKnowledge',
  },
  {
    src: jdcLogo,
    url: 'https://www.juniordataconsulting.com/',
    alt: 'Júnior Data Consulting',
  },
  {
    src: junitecLogo,
    url: 'https://www.junitec.pt',
    alt: 'JUNITEC',
  },
  {
    src: novaeLogo,
    url: 'https://linktr.ee/unovae',
    alt: 'NOVAe',
  },
  {
    src: starJeLogo,
    url: 'https://starje.pt/',
    alt: 'STAR Júnior Enterprise',
  },
  {
    src: hackerSchoolLogo,
    url: 'https://linktr.ee/hackerschool_ist',
    alt: 'Hacker School',
  },
]

const communityPartners = zipArrays(startupPartners, studentPartners)

export default function Partners() {
  return (
    <>
      <div className='flex flex-col align-items-center justify-content-between gap-8'>
        {partners.map((p) => (
          <PartnerIcon key={p.alt} url={p.url} src={p.src} alt={p.alt} />
        ))}
        <div className='grid grid-cols-2 gap-4 sm:gap-8'>
          {foodPartners.map((p) => (
            <CommunityPartnerIcon key={p.url} url={p.url} src={p.src} alt={p.alt} />
          ))}
        </div>
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
