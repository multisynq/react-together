import { CodeBlock } from '@components/ui'
import CodeSpan from '@components/ui/CodeSpan'
import { GenericDocPage } from '../GenericDocPage'
import FunctionArgsApi from './FunctionArgsApi'
import FunctionReturnApi from './FunctionReturnApi'

const codes = {
  usage_1: {
    basic: `
import { utils } from 'react-together'
const { getSessionNameFromUrl } = utils
`,
  },

  usage_2: {
    basic: `
const url = new URL('https://reacttogether.dev?rtName=session1');
const sessionName = getSessionNameFromUrl(url); // 'session1'

const url2 = new URL('https://reacttogether.dev?anotherParam=session2');
const sessionName2 = getSessionNameFromUrl(url, { nameKey: 'anotherParam' }); // 'session2'\
`,
  },
}

export default function GetSessionNameFromUrlDocumentationPage() {
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
  return (
    <GenericDocPage
      {...{
        id: 'getSessionNameFromUrl',
        title: 'getSessionNameFromUrl',
        description: 'Retrieves the session name from a URL.',
        usage: (
          <>
            <CodeBlock code={codes.usage_1} />
            <CodeBlock code={codes.usage_2} />
          </>
        ),
        api,
      }}
    />
  )
}
