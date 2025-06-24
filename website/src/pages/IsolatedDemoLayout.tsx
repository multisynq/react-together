import { Outlet } from 'react-router-dom'

// This layout provides the common demo page styling (e.g., centering)
// but does NOT include the WithReactTogetherProvider.
// This is used for demos that manage their own context providers
// to avoid nested context conflicts.
export function IsolatedDemoLayout() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Outlet />
    </div>
  )
}