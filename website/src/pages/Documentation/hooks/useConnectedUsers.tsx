import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseConnectedUsersDocumentationPage() {
  const content = (
    <GenericDocPage
      title='useConnectedUsers'
      description={
        'The useConnectedUsers hook returns an array of objects representing all the views that are connected to the current session.'
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { useConnectedUsers } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`const connectedUsers = useConnectedUsers()

 return (
   <div ref={ref}>
     Connected users:
     <ul>
       {hoveringViews.map((viewId) => <li key={viewId}>{viewId}</li> }
     </ul>
   </div>
  )`}
          />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useConnectedUsers')} keyToLookupWith='' />
}
