import { CodeBlock } from '@components/ui/CodeBlock'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function PresenceDivDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'default', label: 'Default Value' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: 'rtid',
            type: 'string',
            description: 'The key used to identify this state, passed to the useHoveringViews hook',
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: 'The content to be rendered inside this div',
          },
          {
            name: 'className',
            type: 'string',
            description: 'The className to be passed to the containing div. Used to customize the appearance of this div',
          },
          {
            name: 'options?',
            type: 'UseHoveringViewOptions',
            description: 'The options to be passed to the useHoveringViews hook',
          },
        ]}
      />
    </>
  )
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
      api={api}
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('PresenceDiv')} />
}
