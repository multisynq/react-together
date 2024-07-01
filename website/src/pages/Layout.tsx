import { SiteHeader, SiteFooter } from '@components'
import { HomePage } from './HomePage'
import { DocumentationPage } from './DocumentationPage'

interface AppLayoutProps {
  children?: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <SiteHeader />
      {/* <HomePage /> */}
      <DocumentationPage />
      <SiteFooter />
    </>
  )
}
