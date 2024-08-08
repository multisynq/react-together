import { DocumentDemoContainer } from '@components/ui/DocumentDemoContainer'
import Iframe from 'react-iframe'

interface DocumentationDemoProps {
  url: string
}
export default function DocumentationDemo({ url }: DocumentationDemoProps) {
  const demoUrl = `/#/demos/${url}`
  return (
    <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100'>
      <DocumentDemoContainer labelText='User 1'>
        <Iframe url={demoUrl} height='100%' width='100%' />
      </DocumentDemoContainer>
      <DocumentDemoContainer labelText='User 2'>
        <Iframe url={demoUrl} height='100%' width='100%' />
      </DocumentDemoContainer>
    </div>
  )
}
