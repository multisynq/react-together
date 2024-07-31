import { CodeBlock } from '@components/ui/CodeBlock'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
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
            description: 'The content to be rendered inside this div.',
          },
          {
            name: 'className',
            type: 'string',
            description: 'The className to be passed to the containing div, used to customize its appearance.',
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
  <PresenceDiv rtKey={rtKey}>
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
