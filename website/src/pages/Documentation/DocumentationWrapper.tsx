import DocumentNav from '@components/ui/DocumentNav'
import { Outlet } from 'react-router-dom'

// This component is useful to avoid reloading the DocumentNav component
// everytime the user navigates between documentation pages
export function DocumentationWrapper() {
  return (
    <main className='flex justify-center items-start gap-8 p-6 px-4 sm:px-8 md:px-12 relative bg-[radial-gradient(162.17%_100%_at_100%_0%,#f3f7fd_0%,#f3f7fd_80%,#FFF_100%)]'>
      <div className='hidden sm:block h-full'>
        <DocumentNav />
      </div>
      <Outlet />
    </main>
  )
}
