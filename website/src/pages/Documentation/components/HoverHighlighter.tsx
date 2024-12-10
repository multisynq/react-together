import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import ComponentPropsTable from './ComponentPropsTable'
export default function HoverHighlighterDocumentationPage() {
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
                The key used to identify this state, passed to the <LinkSpan to='/useHoveringUsers' text='useHoveringUsers' /> hook.
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
      title='HoverHighlighter'
      description={
        <>
          <p>
            This component wraps its children inside a <CodeSpan text='div' /> that is highlighted whenever a user is hovering it. This
            component can be customized by passing a <CodeSpan text='className' /> prop. Alternatively, you can create your own component
            using the <LinkSpan to='/useHoveringUsers' text='useHoveringUsers' /> hook.
          </p>
          <DocumentationDemo url='HoverHighlighter' />
        </>
      }
      usage={
        <>
          <CodeBlock language='javascript' codeShort={`import { ReactTogether } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            codeShort={`return (
  <HoverHighlighter rtKey='unique-key'>
    <YourComponent/>
  </HoverHighlighter>
)`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('HoverHighlighter')} />
}
