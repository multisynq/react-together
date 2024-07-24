import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseHoveringViewsDocumentationPage() {
  const content = (
    <GenericDocPage
      title='useHoveringViews'
      description={
        'The useHoveringViews hook is used to tell which views are hovering a given DOM element. If a view is hovering a component that is nested on other “hoverable” components, only the innermost will tell that view is hovering it.'
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { useHoveringViews } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`const [ref, hoveringViews] = useHoveringViews(‘hovering-views’)

 return (
   <div>
     <div ref={ref}> Hover me! </div>
     <h3>Hovering Ids:</h3>
     <ul>
       {hoveringViews.map((viewId) => <li key={viewId}>{viewId}</li>}
     </ul>
   </div>
  )`}
          />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useHoveringViews')} keyToLookupWith='' />
}
