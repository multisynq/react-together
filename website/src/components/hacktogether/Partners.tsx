import multisynqLogo from '@images/blue.svg'
import cloudflareLogo from '@images/cloudflare_logo.svg'
import gaiminLogo from '@images/gaimin_logo.svg'
import { Image, ImageProps } from 'primereact/image'

interface PartnerIconProps extends ImageProps {
  url?: string
}
function PartnerIcon({ url, ...props }: PartnerIconProps) {
  return (
    <a href={url} target='_blank'>
      <Image {...props} width='400' />
    </a>
  )
}

const partners = [
  {
    img: multisynqLogo,
    url: 'https://multisynq.io',
  },
  {
    img: gaiminLogo,
    url: 'https://gaimin.io',
  },
  {
    img: cloudflareLogo,
    url: 'https://cloudflare.com',
  },
]

export default function Partners() {
  const handlePartner = () => {
    window.location.href = 'mailto:hacktogether@multisynq.io?subject=I would like to become a partner!'
  }
  return (
    <div className=''>
      <div className='flex flex-col align-items-center justify-content-between gap-8'>
        {partners.map((p) => (
          <PartnerIcon key={p.url} url={p.url} src={p.img} />
        ))}
        {/* <PartnerIcon {...{ src: multisynqLogo, alt: 'Multisynq logo' }} /> */}
      </div>
      <div className='text-center text-sm mt-8'>
        Interested in partnering?{' '}
        <span className='font-semibold cursor-pointer' onClick={handlePartner}>
          Reach out to us!
        </span>
      </div>
    </div>
  )
}
