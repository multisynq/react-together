import { SiteFooter, SiteHeader } from '@components'
import { Outlet } from 'react-router-dom'
import { version } from 'react-together/package.json'
// This component is useful to avoid reloading the DocumentNav component
// everytime the user navigates between documentation pages
export function WebsiteWrapper() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <div className='version-num'>{version}</div>
    </>
  )
}
