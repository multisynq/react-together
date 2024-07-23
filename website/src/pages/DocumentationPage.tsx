import DocumentBreadCrumb from '@components/ui/DocumentBreadCrumb'
import DocumentNav from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'
import { useParams } from 'react-router-dom'
import { AboutUsPage, aboutUsNavItems } from './Documentation/AboutUsPage'
import { ConfigurationPage, configurationNavItems } from './Documentation/ConfigurationPage'
import { GenericComponentDocNav, GenericComponentDocPage } from './Documentation/GenericComponentDocPage'
import { IntroductionPage, introductionNavItems } from './Documentation/IntroductionPage'
import { MainHooksPage, mainHooksNavItems } from './Documentation/MainHooksPage'
import { PrimeReactPage, primeReactNavItems } from './Documentation/PrimeReactPage'
import { ReactTogetherPage, reactTogetherNavItems } from './Documentation/ReactTogetherPage'
import { RoadmapPage, roadMapNavItems } from './Documentation/RoadmapPage'
import { SessionHooksPage, sessionHooksNavItems } from './Documentation/SessionHooksPage'
import { PrimeReactCheckboxTogetherDemo } from './Documentation/componentDemos/PrimeReactCheckboxTogetherDemo'
import { PrimeReactDropdownTogetherDemo } from './Documentation/componentDemos/PrimeReactDropdownTogetherDemo'
import { PrimeReactInputSwitchTogetherDemo } from './Documentation/componentDemos/PrimeReactInputSwitchTogetherDemo'
import { PrimeReactKnobTogetherDemo } from './Documentation/componentDemos/PrimeReactKnobTogetherDemo'
import { PrimeReactMultiSelectTogetherDemo } from './Documentation/componentDemos/PrimeReactMultiSelectTogetherDemo'
import { PrimeReactRatingTogetherDemo } from './Documentation/componentDemos/PrimeReactRatingTogetherDemo'
import { PrimeReactSelectButtonTogetherDemo } from './Documentation/componentDemos/PrimeReactSelectButtonTogetherDemo'
import { PrimeReactTabViewTogetherDemo } from './Documentation/componentDemos/PrimeReactTabViewTogetherDemo'
import { PrimeReactToggleButtonDemo } from './Documentation/componentDemos/PrimeReactToggleButtonTogetherDemo'
import { PrimeReactTriStateCheckboxDemo } from './Documentation/componentDemos/PrimeReactTriStateCheckboxTogetherDemo'
import { ComponentReturn } from './Documentation/types'

// =

function Configuration() {
  return {
    content: <ConfigurationPage />,
    navItems: configurationNavItems,
  }
}

function PrimeReactComponent(name: string, ComponentDemo) {
  const newName = `${name}Together`
  return {
    content: GenericComponentDocPage({
      name: newName,
      originalName: name,
      docUrl: `https://primereact.org/${name.toLowerCase()}/`,
      ComponentDemo,
    }),
    navItems: GenericComponentDocNav(newName),
  }
}

function PrimeReactCheckboxTogether() {
  return PrimeReactComponent('Checkbox', PrimeReactCheckboxTogetherDemo)
}

function PrimeReactDropdownTogether() {
  return PrimeReactComponent('Dropdown', PrimeReactDropdownTogetherDemo)
}

function PrimeReactInputSwitchTogether() {
  return PrimeReactComponent('InputSwitch', PrimeReactInputSwitchTogetherDemo)
}

function PrimeReactKnobTogether() {
  return PrimeReactComponent('Knob', PrimeReactKnobTogetherDemo)
}

function PrimeReactMultiSelectTogether() {
  return PrimeReactComponent('MultiSelect', PrimeReactMultiSelectTogetherDemo)
}

function PrimeReactRadioButtonTogether() {
  return PrimeReactComponent('RadioButton', PrimeReactCheckboxTogetherDemo)
}

function PrimeReactRatingTogether() {
  return PrimeReactComponent('Rating', PrimeReactRatingTogetherDemo)
}

function PrimeReactSelectButtonTogether() {
  return PrimeReactComponent('SelectButton', PrimeReactSelectButtonTogetherDemo)
}

function PrimeReactTabViewTogether() {
  return PrimeReactComponent('TabView', PrimeReactTabViewTogetherDemo)
}

function PrimeReactTriStateCheckboxTogether() {
  return PrimeReactComponent('TriStateCheckbox', PrimeReactTriStateCheckboxDemo)
}

function PrimeReactToggleButtonTogether() {
  return PrimeReactComponent('ToggleButton', PrimeReactToggleButtonDemo)
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
  'components/primereact': PrimeReact,
  'primereact/checkboxtogether': PrimeReactCheckboxTogether,
  'primereact/dropdowntogether': PrimeReactDropdownTogether,
  'primereact/inputswitchtogether': PrimeReactInputSwitchTogether,
  'primereact/knobtogether': PrimeReactKnobTogether,
  'primereact/multiselecttogether': PrimeReactMultiSelectTogether,
  'primereact/radiobuttontogether': PrimeReactRadioButtonTogether,
  'primereact/ratingtogether': PrimeReactRatingTogether,
  'primereact/selectbuttontogether': PrimeReactSelectButtonTogether,
  'primereact/tabviewtogether': PrimeReactTabViewTogether,
  'primereact/tristatecheckboxtogether': PrimeReactTriStateCheckboxTogether,
  'primereact/togglebuttontogether': PrimeReactToggleButtonTogether,
  'discover/about-us': AboutUs,
  'discover/roadmap': RoadMap,
}

export function DocumentationPage() {
  const { slug1, slug2 } = useParams()
  const keyToLookupWith = `${slug1}/${slug2}`
  const Component = lookup[keyToLookupWith] || (() => ({ content: <div>unknown</div>, navItems: [] }))
  const { content, navItems } = Component()

  return (
    // <main className='flex justify-center items-start gap-12 self-stretch p-6 px-16 relative'>
    <main className='flex justify-center items-start gap-12 p-6 px-16 relative bg-[radial-gradient(162.17%_100%_at_100%_0%,#f3f7fd_0%,#f3f7fd_23%,#FFF_100%)]'>
      <div className='hidden sm:block h-full'>
        <DocumentNav />
      </div>
      <div className='flex flex-col items-start gap-[1.5rem] w-full'>
        <DocumentBreadCrumb currentPath={keyToLookupWith} />
        {content}
      </div>
      <PageNav items={navItems} />
    </main>
  )
}
