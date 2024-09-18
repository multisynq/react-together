import { Button } from 'primereact/button'
import { Image } from 'primereact/image'

export default function Partners() {
  return (
    <div className='p-4'>
      <h3>Partners</h3>
      <div className='flex align-items-center justify-content-between mt-4'>
        <Image {...{ src: '/api/placeholder/100/50', alt: 'Multisynq logo', width: '100' }} />
        <Button
          {...{
            label: 'Become a Partner',
            className: 'p-button-outlined',
            onClick: () => (window.location.href = 'mailto:hacktogether@multisynq.io?subject=I would like to become a partner!'),
          }}
        />
      </div>
    </div>
  )
}
