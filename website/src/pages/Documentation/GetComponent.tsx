import { NavItem } from './types'

export const GetComponent: React.FC = () => {
  return (
    <>
      <h3 id='get'>Get</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
      </p>
    </>
  )
}

export const getNavItems: NavItem[] = [{ key: 'get', label: 'Get' }]
