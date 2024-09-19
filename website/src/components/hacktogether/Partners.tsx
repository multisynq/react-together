import multisynqLogo from '@images/blue.svg'
import cloudflareLogo from '@images/cloudflare_logo.svg'
import gaiminLogo from '@images/gaimin_logo.svg'

interface PartnerIconProps {
  url?: string
  src: string
  alt: string
}

function PartnerIcon({ url, src, alt }: PartnerIconProps) {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer'>
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
  {
    img: multisynqLogo,
    url: 'https://multisynq.io',
    alt: 'MultiSynq Logo',
  },
  {
    img: gaiminLogo,
    url: 'https://gaimin.io',
    alt: 'Gaimin Logo',
  },
  {
    img: cloudflareLogo,
    url: 'https://cloudflare.com',
    alt: 'Cloudflare Logo',
  },
]

export default function Partners() {
  const handlePartner = () => {
    window.location.href = 'mailto:hacktogether@multisynq.io?subject=I would like to become a partner!'
  }

  return (
    <>
      <div className='flex flex-col align-items-center justify-content-between gap-8'>
        {partners.map((p) => (
          <PartnerIcon key={p.url} url={p.url} src={p.img} alt={p.alt} />
        ))}
      </div>
      <div className='text-center text-sm mt-8'>
        Interested in partnering?{' '}
        <span className='font-semibold cursor-pointer' onClick={handlePartner}>
          Reach out to us!
        </span>
      </div>
    </>
  )
}
