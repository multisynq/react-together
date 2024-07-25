import { CodeBlock } from '@components/ui/CodeBlock'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseIsTogetherDocumentationPage() {
  const api = (
    <>
      <h5>Return</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: 'isTogether',
            type: 'boolean',
            description: 'Indicates whether the user is connected to a React Together session.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useIsTogether'
      description={'The useIsTogether hook returns true if the user is connected to a React Together session, and false otherwise.'}
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useIsTogether } from 'react-together'`} />
          <CodeBlock language='jsx' code1={`const isTogether = useIsTogether()`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useIsTogether')} keyToLookupWith='' />
}
