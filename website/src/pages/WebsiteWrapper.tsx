import { SiteFooter, SiteHeader } from '@components'
import { version } from '@multisynq/react-together/package.json'
import { Outlet } from 'react-router-dom'
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
