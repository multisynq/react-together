import { Navbar } from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}
export function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full">
      <Navbar />
      <div className="px-4">{children}</div>
    </div>
  )
}
