import { Button } from 'primereact/button'

interface NavbarButtonProps {
  icon: string
  onClick?: () => void
}
export function NavbarButton({ icon, onClick }: NavbarButtonProps) {
  return (
    <Button
      icon={`pi ${icon}`}
      size='small'
      text
      severity='secondary'
      onClick={onClick}
      className='p-0'
      pt={{
        root: {
          className: 'my-1 w-min h-min p-1 rounded-full shadow-none',
        },
      }}
    />
  )
}
