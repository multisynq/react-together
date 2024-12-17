import { Outlet } from 'react-router-dom'

function Navbar() {
  return <nav>React Together Playground</nav>
}

export function Layout() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  )
}
