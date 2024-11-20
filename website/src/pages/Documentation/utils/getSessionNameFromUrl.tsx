import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import { GenericDocPage } from '../GenericDocPage'
import FunctionArgsApi from './FunctionArgsApi'
import FunctionReturnApi from './FunctionReturnApi'

export default function GetSessionNameFromUrlDocumentationPage() {
  const description = (
    <>
      <p>Retrieves the session name from a URL.</p>
    </>
  )
  const usage = (
    <>
      <CodeBlock
        language='jsx'
        code1={`\
import { utils } from 'react-together'
const { getSessionNameFromUrl } = utils`}
      />
      <CodeBlock
        language='jsx'
        code1={`\
const url = new URL('https://reacttogether.dev?rtName=session1');
const sessionName = getSessionNameFromUrl(url); // 'session1'

const url2 = new URL('https://reacttogether.dev?anotherParam=session2');
const sessionName2 = getSessionNameFromUrl(url, { nameKey: 'anotherParam' }); // 'session2'\
`}
      />
    </>
  )
  const api = (
    <>
      <FunctionArgsApi
        items={[
          {
            name: 'url',
            type: 'URL',
            description: 'The URL object to extract the session name from',
          },
          {
            name: 'options.nameKey',
            type: 'string',
            default: 'rtName',
            description: 'The query parameter key for the session name.',
          },
        ]}
      />
      <FunctionReturnApi
        items={[
          {
            name: 'name',
            type: 'string | null',
            description: (
              <span>
                The session name value, or <CodeSpan text='null' /> if it does not exist.
              </span>
            ),
          },
        ]}
      />
    </>
  )
  return <GenericDocPage id='getSessionNameFromUrl' title='getSessionNameFromUrl' description={description} usage={usage} api={api} />
}
