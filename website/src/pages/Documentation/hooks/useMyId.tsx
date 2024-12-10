import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '../DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

export default function UseMyIdDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'myId',
            type: 'string | null',
            description: 'The Id of the local user',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useMyId'
      description={
        <p>
          The <CodeSpan text='useMyId' /> hook returns the <CodeSpan text='userId' /> of the local user. This ID is an alias for the{' '}
          <LinkSpan text='useViewId' to='https://multisynq.io/docs/croquet-react/global.html#useViewId' target='_blank' /> hook of{' '}
          <CodeSpan text='@croquet/react' />.
        </p>
      }
      usage={
        <>
          <CodeBlock language='jsx' codeShort={`import { useMyId } from 'react-together'`} />
          <CodeBlock language='jsx' codeShort={`const myId = useMyId()`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useMyId')} />
}
