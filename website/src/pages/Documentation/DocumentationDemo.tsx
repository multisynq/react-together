import { WithReactTogetherProvider } from '@components/sections/HeroDemo'
import { DocumentDemoContainer } from '@components/ui/DocumentDemoContainer'

interface DocumentationDemoProps {
  children: React.ReactNode
}
export default function DocumentationDemo({ children }: DocumentationDemoProps) {
  return (
    <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100'>
      <DocumentDemoContainer labelText='View 1'>
        <WithReactTogetherProvider>{children}</WithReactTogetherProvider>
      </DocumentDemoContainer>
      <DocumentDemoContainer labelText='View 2'>
        <WithReactTogetherProvider>{children}</WithReactTogetherProvider>
      </DocumentDemoContainer>
    </div>
  )
}
