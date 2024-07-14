import { ComponentHooks } from 'primereact/componentbase'
import { ModeToggle } from '@components'
import DocumentBreadCrumb from '@components/ui/DocumentBreadCrumb'
import DocumentNav from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'
import { useParams } from 'react-router-dom'
import { ComponentReturn } from './Documentation/types'
import { HooksComponent, hooksNavItems } from './Documentation/HooksComponent'
import { IntroductionGetStarted, IntroNavItems } from './Documentation/IntroductionGetStarted'

function Page({ children }) {
  return <div className='flex max-w-[87rem] items-start gap-8 flex-1 h-full'>{children}</div>
}

function CoreConcept() {
  const navItems = [
    { key: 'core-concept', label: 'Core Concept' },
    { key: 'core-concept1', label: 'Core Concept1' },
    { key: 'core-concept2', label: 'Core Concept2' },
    { key: 'core-concept3', label: 'Core Concept3' },
  ]

  return {
    content: (
      <>
        <h3 id='core-concept'>Core Concept</h3>
        <p>...</p>
        <h3 id='core-concept1'>Core Concept1</h3>
        <p>...</p>
        <h3 id='core-concept2'>Core Concept2</h3>
        <p>...</p>
        <h3 id='core-concept3'>Core Concept3</h3>
      </>
    ),
    navItems,
  }
}

function Configuration() {
  const navItems = [
    { key: 'configuration', label: 'Configuration' },
    // Add more items as needed
  ]

  return {
    content: (
      <>
        <h3 id='configuration'>Configuration</h3>
        <p>...</p>
      </>
    ),
    navItems,
  }
}

function Playground() {
  const navItems = [{ key: 'playground', label: 'playground' }]

  return {
    content: (
      <>
        <h3 id='playground'>Playground</h3>
        <p>...</p>
      </>
    ),
    navItems,
  }
}

function Introduction() {
  return {
    content: <IntroductionGetStarted />,
    navItems: IntroNavItems,
  }
}

function Hooks(): ComponentReturn {
  return {
    content: <HooksComponent />,
    navItems: hooksNavItems,
  }
}

const lookup = {
  '': Introduction,
  'get-started': Introduction,
  'get-started/introduction': Introduction,
  'get-started/core-concept': CoreConcept,
  'get-started/configuration': Configuration,
  'get-started/playground': Playground,
  'components/hooks': Hooks,
}

export function DocumentationPage() {
  const { slug1, slug2 } = useParams()
  const keyToLookupWith = `${slug1}/${slug2}`
  const Component = lookup[keyToLookupWith] || (() => ({ content: <div>unknown</div>, navItems: [] }))
  const { content, navItems } = Component()

  return (
    <main className='flex justify-center items-start gap-12 self-stretch p-6 pr-8 pb-8 pl-8 relative'>
      <div className='hidden sm:block w-[200px] '>
        <DocumentNav />
      </div>
      <div className='flex-1'>
        <div className='flex flex-col items-start gap-[1.4375rem]'>
          <DocumentBreadCrumb currentPath={keyToLookupWith} />
          {content}
        </div>
      </div>
      <PageNav items={navItems} />
    </main>
  )
}
