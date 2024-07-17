import { ComponentHooks } from 'primereact/componentbase'
import { ModeToggle } from '@components'
import DocumentBreadCrumb from '@components/ui/DocumentBreadCrumb'
import DocumentNav from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'
import { useParams } from 'react-router-dom'
import { ComponentReturn } from './Documentation/types'
import { MainHooksPage, mainHooksNavItems } from './Documentation/MainHooksPage'
import { IntroductionPage, introductionNavItems } from './Documentation/IntroductionPage'
import { SessionHooksPage, sessionHooksNavItems } from './Documentation/SessionHooksPage'
import { ConfigurationPage, configurationNavItems } from './Documentation/ConfigurationPage'
import { ReactTogetherPage, reactTogetherNavItems } from './Documentation/ReactTogetherPage'
import { PrimeReactPage, primeReactNavItems } from './Documentation/PrimeReactPage'
import { AboutUsPage, aboutUsNavItems } from './Documentation/AboutUsPage'
import { RoadmapPage, roadMapNavItems } from './Documentation/RoadmapPage'

function Page({ children }) {
  return <div className='flex max-w-[87rem] items-start gap-8 flex-1 h-full'>{children}</div>
}

function Configuration() {
  return {
    content: <ConfigurationPage />,
    navItems: configurationNavItems,
  }
}

function Introduction() {
  return {
    content: <IntroductionPage />,
    navItems: introductionNavItems,
  }
}

function MainHooks(): ComponentReturn {
  return {
    content: <MainHooksPage />,
    navItems: mainHooksNavItems,
  }
}

function SessionHooks(): ComponentReturn {
  return {
    content: <SessionHooksPage />,
    navItems: sessionHooksNavItems,
  }
}

function ReactTogether(): ComponentReturn {
  return {
    content: <ReactTogetherPage />,
    navItems: reactTogetherNavItems,
  }
}

function PrimeReact(): ComponentReturn {
  return {
    content: <PrimeReactPage />,
    navItems: primeReactNavItems,
  }
}

function AboutUs(): ComponentReturn {
  return {
    content: <AboutUsPage />,
    navItems: aboutUsNavItems,
  }
}

function RoadMap(): ComponentReturn {
  return {
    content: <RoadmapPage />,
    navItems: roadMapNavItems,
  }
}

const lookup = {
  '': Introduction,
  'get-started': Introduction,
  'get-started/introduction': Introduction,
  'get-started/configuration': Configuration,
  'hooks/main-hooks': MainHooks,
  'hooks/session-hooks': SessionHooks,
  'components/react-together': ReactTogether,
  'components/prime-react': PrimeReact,
  'discover/about-us': AboutUs,
  'discover/roadmap': RoadMap,
}

export function DocumentationPage() {
  const { slug1, slug2 } = useParams()
  const keyToLookupWith = `${slug1}/${slug2}`
  const Component = lookup[keyToLookupWith] || (() => ({ content: <div>unknown</div>, navItems: [] }))
  const { content, navItems } = Component()

  return (
    <main className='flex justify-center items-start gap-12 self-stretch p-6 pr-8 pb-8 pl-8 relative'>
      <DocumentNav />
      <div className='flex flex-col items-start gap-[1.5rem]'>
        <DocumentBreadCrumb currentPath={keyToLookupWith} />
        {content}
      </div>
      <PageNav items={navItems} />
    </main>
  )
}
