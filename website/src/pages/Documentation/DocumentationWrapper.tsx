import DocumentNav from '@components/ui/DocumentNav'
import { Outlet } from 'react-router-dom'

// This component is useful to avoid reloading the DocumentNav component
// everytime the user navigates between documentation pages
export function DocumentationWrapper() {
  return (
    <main className='bg-[radial-gradient(162.17%_100%_at_100%_0%,#f3f7fd_0%,#f3f7fd_80%,#FFF_100%)] flex justify-center'>
      <div className='flex justify-center gap-2 lg:gap-8 p-6 px-2 md:px-12 relative w-full max-w-[98rem] items-start'>
        <div className='hidden sm:block'>
          <DocumentNav />
        </div>
        <Outlet />
      </div>
    </main>
  )
}
