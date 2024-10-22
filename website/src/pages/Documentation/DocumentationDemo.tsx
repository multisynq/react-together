import { DocumentDemoContainer } from '@components/ui/DocumentDemoContainer'
import Iframe from 'react-iframe'
import { SESSION_NAME_PARAM, SESSION_PASSWORD_PARAM } from 'react-together'

function buildUrl(path: string, session: SessionParams): string {
  const params = new URLSearchParams([
    [SESSION_NAME_PARAM, session.name],
    [SESSION_PASSWORD_PARAM, session.password],
  ])
  // If the search parameters are after the hash,
  // they will be treated as part of the hash
  return `?${params.toString()}#${path}`
}

const defaultSession: SessionParams = Object.freeze({
  name: 'ReactTogetherDemo',
  password: 'secret-password',
})

interface SessionParams {
  name?: string
  password?: string
}

interface DocumentationDemoProps {
  url: string
  session1?: SessionParams | null
  session2?: SessionParams | null
}
export default function DocumentationDemo({ url, session1, session2 }: DocumentationDemoProps) {
  const demoPath = `/demos/${url}`
  if (session1 === undefined) {
    session1 = defaultSession
  }
  if (session2 === undefined) {
    session2 = session1
  }
  const url1 = buildUrl(demoPath, session1)
  const url2 = buildUrl(demoPath, session2)

  return (
    <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100'>
      <DocumentDemoContainer labelText='User 1'>
        <Iframe url={url1} height='100%' width='100%' />
      </DocumentDemoContainer>
      <DocumentDemoContainer labelText='User 2'>
        <Iframe url={url2} height='100%' width='100%' />
      </DocumentDemoContainer>
    </div>
  )
}
