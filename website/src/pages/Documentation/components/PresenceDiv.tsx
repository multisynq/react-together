import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function PresenceDivDocumentationPage() {
  const content = (
    <GenericDocPage
      title='PresenceDiv'
      description='This component uses the useHoveringViews hook to render a div that is highlighted whenever a view is hovering it.'
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { ReactTogether } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`return (
  <PresenceDiv rtid={rtid}>
    <YourComponent/>
  </PresenceDiv>
)`}
          />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('PresenceDiv')} keyToLookupWith='' />
}
