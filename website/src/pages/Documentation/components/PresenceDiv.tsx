import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import ComponentPropsTable from './ComponentPropsTable'
export default function PresenceDivDocumentationPage() {
  const api = (
    <>
      <h5>Props</h5>
      <ComponentPropsTable
        items={[
          {
            name: 'rtKey',
            type: 'string',
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useHoveringViews' text='useHoveringViews' /> hook.
              </p>
            ),
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: (
              <p>
                The content to be rendered inside this <CodeSpan text='div' />.
              </p>
            ),
          },
          {
            name: 'highlightMyself',
            type: 'boolean',
            default: <CodeSpan text='false' />,
            description: <p>If true, the nested component will be highlighted when the local user hovers it.</p>,
          },
          {
            name: 'className',
            type: 'string',
            description: (
              <p>
                The <CodeSpan text='className' /> to be passed to the containing <CodeSpan text='div' />, used to customize its appearance.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='PresenceDiv'
      description={
        <>
          <p>
            This component wraps its children inside a <CodeSpan text='div' /> that is highlighted whenever a view is hovering it. This
            component can be customized by passing a <CodeSpan text='className' /> prop. Alternatively, you can create your own component
            using the <LinkSpan to='/useHoveringViews' text='useHoveringViews' /> hook.
          </p>
          <DocumentationDemo url='PresenceDiv' />
        </>
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { ReactTogether } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`return (
  <PresenceDiv rtKey='unique-key'>
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
