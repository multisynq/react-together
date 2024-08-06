import { WithReactTogetherProvider } from '@components/sections/HeroDemo'
import { Outlet } from 'react-router-dom'

// This component is useful to avoid reloading the DocumentNav component
// everytime the user navigates between documentation pages
export function DemoWrapper() {
  return (
    <WithReactTogetherProvider>
      <div className='flex justify-center items-center h-screen'>
        <Outlet />
      </div>
    </WithReactTogetherProvider>
  )
}
