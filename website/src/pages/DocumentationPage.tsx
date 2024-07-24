import { useParams } from 'react-router-dom'
import {
  ConnectedViewsDocumentationPage,
  IntroductionPage,
  PresenceDivDocumentationPage,
  PrimeReactCalendarTogetherDocumentationPage,
  PrimeReactCheckboxTogetherDocumentationPage,
  PrimeReactDropdownTogetherDocumentationPage,
  PrimeReactInputSwitchTogetherDocumentationPage,
  PrimeReactKnobTogetherDocumentationPage,
  PrimeReactMultiSelectTogetherDocumentationPage,
  PrimeReactRatingTogetherDocumentationPage,
  PrimeReactSelectButtonTogetherDocumentationPage,
  PrimeReactTabViewTogetherDocumentationPage,
  PrimeReactToggleButtonTogetherDocumentationPage,
  PrimeReactTriStateCheckboxTogetherDocumentationPage,
  ReactTogetherDocumentationPage,
  UseConnectNewSessionDocumentationPage,
  UseConnectedUsersDocumentationPage,
  UseHoveringViewsDocumentationPage,
  UseIsTogetherDocumentationPage,
  UseLeaveSessionDocumentationPage,
  UseStateTogetherDocumentationPage,
  UseStateTogetherWithPerUserValuesDocumentationPage,
} from './documentation'
// import { AboutUsPage, aboutUsNavItems } from './documentation/AboutUsPage'
// import { ConfigurationPage, configurationNavItems } from './documentation/ConfigurationPage'
// import { GenericDocNav, GenericDocPage } from './documentation/GenericDocPage'
// import { RoadmapPage, roadMapNavItems } from './documentation/RoadmapPage'
// import PrimeReactCalendarTogetherDocumentationPage from './documentation/components/primereact/CalendarTogether'
// import { PrimeReactComponentDocumentationPage } from './documentation/components/primereact/PrimeReactComponentDocumentationPage'
// import { ComponentReturn } from './documentation/types'
// =

// function Configuration() {
//   return {
//     content: <ConfigurationPage />,
//     navItems: configurationNavItems,
//   }
// }

// function AboutUs(): ComponentReturn {
//   return {
//     content: <AboutUsPage />,
//     navItems: aboutUsNavItems,
//   }
// }

// function RoadMap(): ComponentReturn {
//   return {
//     content: <RoadmapPage />,
//     navItems: roadMapNavItems,
//   }
// }

const lookup = {
  '': IntroductionPage,
  'get-started': IntroductionPage,
  'get-started/introduction': IntroductionPage,
  // 'get-started/configuration': Configuration,
  'components/ReactTogether': ReactTogetherDocumentationPage,
  'components/ConnectedViews': ConnectedViewsDocumentationPage,
  'components/PresenceDiv': PresenceDivDocumentationPage,
  'primereact/calendartogether': PrimeReactCalendarTogetherDocumentationPage,
  'primereact/checkboxtogether': PrimeReactCheckboxTogetherDocumentationPage,
  'primereact/dropdowntogether': PrimeReactDropdownTogetherDocumentationPage,
  'primereact/inputswitchtogether': PrimeReactInputSwitchTogetherDocumentationPage,
  'primereact/knobtogether': PrimeReactKnobTogetherDocumentationPage,
  'primereact/multiselecttogether': PrimeReactMultiSelectTogetherDocumentationPage,
  'primereact/ratingtogether': PrimeReactRatingTogetherDocumentationPage,
  'primereact/selectbuttontogether': PrimeReactSelectButtonTogetherDocumentationPage,
  'primereact/tabviewtogether': PrimeReactTabViewTogetherDocumentationPage,
  'primereact/togglebuttontogether': PrimeReactToggleButtonTogetherDocumentationPage,
  'primereact/tristatecheckboxtogether': PrimeReactTriStateCheckboxTogetherDocumentationPage,
  'hooks/useStateTogether': UseStateTogetherDocumentationPage,
  'hooks/useStateTogetherWithPerUserValues': UseStateTogetherWithPerUserValuesDocumentationPage,
  'hooks/useConnectedUsers': UseConnectedUsersDocumentationPage,
  'hooks/useHoveringViews': UseHoveringViewsDocumentationPage,
  'hooks/useIsTogether': UseIsTogetherDocumentationPage,
  'hooks/useConnectNewSession': UseConnectNewSessionDocumentationPage,
  'hooks/useLeaveSession': UseLeaveSessionDocumentationPage,
  // 'discover/about-us': AboutUs,
  // 'discover/roadmap': RoadMap,
}

export function DocumentationPage() {
  const { slug1, slug2 } = useParams()
  const keyToLookupWith = `${slug1}/${slug2}`
  const Component = lookup[keyToLookupWith] || (() => ({ content: <div>unknown</div>, navItems: [] }))
  // const { content, navItems } = Component()

  // return (
  //   // <main className='flex justify-center items-start gap-12 self-stretch p-6 px-16 relative'>
  //   <main className='flex justify-center items-start gap-12 p-6 px-16 relative bg-[radial-gradient(162.17%_100%_at_100%_0%,#f3f7fd_0%,#f3f7fd_23%,#FFF_100%)]'>
  //     <div className='hidden sm:block h-full'>
  //       <DocumentNav />
  //     </div>
  //     <div className='flex flex-col items-start gap-[1.5rem] w-full'>
  //       <DocumentBreadCrumb currentPath={keyToLookupWith} />
  //       {content}
  //     </div>
  //     <PageNav items={navItems} />
  //   </main>
  // )
  return <Component />
}
