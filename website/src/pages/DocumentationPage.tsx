import { ModeToggle } from '@components'
import { CodeBlockExample } from '@components/ui/CodeBlockExample'
import DocumentBreadCrumb from '@components/ui/DocumentBreadCrumb'
import DocumentDemoBox from '@components/ui/DocumentDemoBox'
import DocumentNav from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'
import { useParams } from 'react-router-dom'

function Page({ children }) {
  return <div className='flex max-w-[87rem] items-start gap-8 flex-1 h-full'>{children}</div>
}

function PageDocument() {
  return (
    <div className='flex flex-col items-start gap-[1.4375rem] flex-1'>
      <>
        <DocumentBreadCrumb />
        <h2>Introduction</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed massa tortor. Vestibulum dapibus molestie sem sed malesuada.
          Maecenas commodo blandit magna et tempus.
        </p>
        <DocumentDemoBox />
        <CodeBlockExample />
      </>
    </div>
  )
}
function CoreConcept() {
  return (
    <div className='flex flex-col items-start gap-[1.4375rem] flex-1'>
      <>
        <DocumentBreadCrumb />
        <h2>Core Concept</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed massa tortor. Vestibulum dapibus molestie sem sed malesuada.
          Maecenas commodo blandit magna et tempus.
        </p>
        <DocumentDemoBox />
        <CodeBlockExample />
      </>
    </div>
  )
}
const lookup = {
  'get-started/': PageDocument,
  'get-started/introduction': PageDocument,
  'core-concept': CoreConcept,
}
export function DocumentationPage() {
  const { slug1, slug2 } = useParams()
  const keyToLookupWith = `${slug1}/${slug2}`
  // const CompToUse = lookup[keyToLookupWith] || <div>unknown</div>
  return (
    <main className='flex justify-center items-start gap-12 self-stretch p-6 pr-8 pb-8 pl-8 h-screen relative'>
      {/* <div>{keyToLookupWith}</div> */}
      <div className='hidden sm:block w-[200px] '>
        <DocumentNav />
      </div>
      <Page>
        {/* <CompToUse /> */}
        <CoreConcept />
        <PageNav />
      </Page>
    </main>
  )
}
