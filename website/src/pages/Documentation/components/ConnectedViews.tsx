import { CodeBlock } from '@components/ui/CodeBlock'
import LinkSpan from '@components/ui/LinkSpan'
import OverfillSpan from '@components/ui/OverfillSpan'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import ComponentPropsTable from './ComponentPropsTable'

export default function ConnectedViewsDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <ComponentPropsTable
        items={[
          {
            name: 'maxAvatars',
            type: 'number',
            default: '3',
            description: (
              <OverfillSpan text='The maximum number of circles rendered by this component. If maxAvatars is 3 and there are 3 views connected, it will render three circles, one for each view. If there are four views connected, it will render the circles for two views, and one circle with “+2”.' />
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='ConnectedViews'
      description={
        <p>
          This component uses the <LinkSpan to='/useConnectedViews' text='useConnectedViews' /> hook to display the views that are connected
          to the current React Together session.
        </p>
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { ConnectedViews } from 'react-together'`} />
          <CodeBlock language='javascript' code1={`return <ConnectedViews/>`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('ConnectedViews')} />
}
