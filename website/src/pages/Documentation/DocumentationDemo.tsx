import { DocumentDemoContainer } from '@components/ui/DocumentDemoContainer'
import Iframe from 'react-iframe'
import { utils } from 'react-together'

const { getJoinUrl } = utils

function buildUrl(path: string, session: SessionParams | null): string {
  const url = new URL(window.location.href)
  url.pathname = path
  if (!session) return url.toString()

  return getJoinUrl(url, session.name, session.password).toString()
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
  aspectRatio?: string
}
export default function DocumentationDemo({ url, session1, session2, aspectRatio }: DocumentationDemoProps) {
  const demoPath = `/demos/${url}`
  if (session1 === undefined) session1 = defaultSession
  if (session2 === undefined) session2 = session1
  const url1 = buildUrl(demoPath, session1)
  const url2 = buildUrl(demoPath, session2)

  return (
    <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100'>
      <DocumentDemoContainer labelText='User 1' aspectRatio={aspectRatio}>
        <Iframe url={url1} height='100%' width='100%' />
      </DocumentDemoContainer>
      <DocumentDemoContainer labelText='User 2' aspectRatio={aspectRatio}>
        <Iframe url={url2} height='100%' width='100%' />
      </DocumentDemoContainer>
    </div>
  )
}
