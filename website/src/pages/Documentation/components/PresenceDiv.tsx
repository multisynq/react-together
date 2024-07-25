import { CodeBlock } from '@components/ui/CodeBlock'
import LinkSpan from '@components/ui/LinkSpan'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
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
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useHoveringViews' text='useHoveringViews' /> hook
              </p>
            ),
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
          // {
          //   name: 'options?',
          //   type: 'UseHoveringViewOptions',
          //   description: (
          //     <p>
          //       The options to be passed to the <LinkSpan to='/useHoveringViews' text='useHoveringViews' /> hook'
          //     </p>
          //   ),
          // },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='PresenceDiv'
      description={
        <p>
          This component uses the <LinkSpan to='/useHoveringViews' text='useHoveringViews' /> hook to render a div that is highlighted
          whenever a view is hovering it.
        </p>
      }
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
  return <DocumentationPage content={content} navItems={GenericDocNav('PresenceDiv')} />
}
