import { CodeBlock } from '@components/ui/CodeBlock'
import { GenericDocPage } from '../GenericDocPage'
import FunctionArgsApi from './FunctionArgsApi'
import FunctionReturnApi from './FunctionReturnApi'

export default function GetCleanUrlDocumentationPage() {
  const description = 'Creates a new URL with specified session name and password parameters removed from the query string and hash.'
  const usage = (
    <>
      <CodeBlock
        language='jsx'
        codeShort={`\
import { utils } from 'react-together'
const { getCleanUrl } = utils`}
      />
      <CodeBlock
        language='jsx'
        codeShort={`\
const url = new URL('https://reacttogether.dev?rtName=session1#rtPwd=password123');
const cleanUrl = getCleanUrl(url);
console.log(cleanUrl.toString()); // 'https://reacttogether.dev'

const url2 = new URL('https://reacttogether.dev?name=session1#pwd=password123');
const cleanUrl2 = getCleanUrl(url2, { nameKey: 'name', passwordKey: 'pwd' });
console.log(cleanUrl2.toString()); // 'https://reacttogether.dev'
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
            description: 'The base URL to modify.',
          },
          {
            name: 'options.nameKey',
            type: 'string',
            default: 'rtName',
            description: 'The query parameter key to remove.',
          },
          {
            name: 'options.passwordKey',
            type: 'string',
            default: 'rtPwd',
            description: 'The hash parameter key to remove.',
          },
        ]}
      />
      <FunctionReturnApi
        items={[
          {
            name: 'url',
            type: 'URL',
            description: 'A new URL instance without the specified session name and password parameters.',
          },
        ]}
      />
    </>
  )
  return <GenericDocPage id='getCleanUrl' title='getCleanUrl' description={description} usage={usage} api={api} />
}
