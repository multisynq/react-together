import {
  ConnectedViewsDocumentationPage,
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
} from './documentation/components'
// import { AboutUsPage, aboutUsNavItems } from './documentation/AboutUsPage'
// import { ConfigurationPage, configurationNavItems } from './documentation/ConfigurationPage'
// import { GenericDocNav, GenericDocPage } from './documentation/GenericDocPage'
// import { IntroductionPage, introductionNavItems } from './documentation/IntroductionPage'
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

// function DocumentUseStateTogether() {
//   return {
//     content: (
//       <GenericDocPage
//         title='useStateTogether'
//         description='The useStateTogether hook makes every user see the same state simultaneously. If the user is not connected to any session, then this hook behaves as a normal useState.'
//         usage={
//           <>
//             <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
//             <CodeBlock
//               language='javascript'
//               code1={`const [count, setCount] = useStateTogether('unique-id', 0)

// const increment = () => setCount((prev) => prev + 1)
// const reset = () => setCount(0)`}
//             />
//           </>
//         }
//       />
//     ),
//     navItems: GenericDocNav('useStateTogether'),
//   }
// }

// function DocumentUseStateTogetherWithPerUserValues() {
//   return {
//     content: (
//       <GenericDocPage
//         title='useStateTogetherWithPerUserValues'
//         description={
//           'The useStateTogetherWithValuesPerUser hook allows users to read the state of all of their peers. ' +
//           'If the user is not connected to any session, then the hook will behave as a normal useState, and the peer state object will be empty.'
//         }
//         usage={
//           <>
//             <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
//             <CodeBlock
//               language='javascript'
//               code1={`const [count, setCount, countPerUser] = useStateTogetherWithPerUserValues('unique-id', 0)

// const increment = () => setCount((prev) => prev + 1)
// const reset = () => setCount(0)`}
//             />
//           </>
//         }
//       />
//     ),
//     navItems: GenericDocNav('useStateTogether'),
//   }
// }

// function DocumentUseConnectedUsers() {
//   return {
//     content: (
//       <GenericDocPage
//         title='useConnectedUsers'
//         description={
//           'The useConnectedUsers hook returns an array of objects representing all the views that are connected to the current session.'
//         }
//         usage={
//           <>
//             <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
//             <CodeBlock
//               language='javascript'
//               code1={`const connectedUsers = useConnectedUsers()

//  return (
//    <div ref={ref}>
//      Connected users:
//      <ul>
//        {hoveringViews.map((viewId) => <li key={viewId}>{viewId}</li> }
//      </ul>
//    </div>
//   )`}
//             />
//           </>
//         }
//       />
//     ),
//     navItems: GenericDocNav('useStateTogether'),
//   }
// }

// function DocumentUseHoveringViews() {
//   return {
//     content: (
//       <GenericDocPage
//         title='useHoveringViews'
//         description={
//           'The useHoveringViews hook is used to tell which views are hovering a given DOM element. If a view is hovering a component that is nested on other “hoverable” components, only the innermost will tell that view is hovering it.'
//         }
//         usage={
//           <>
//             <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
//             <CodeBlock
//               language='javascript'
//               code1={`const [ref, hoveringViews] = useHoveringViews(‘hovering-views’)

//  return (
//    <div>
//      <div ref={ref}> Hover me! </div>
//      <h3>Hovering Ids:</h3>
//      <ul>
//        {hoveringViews.map((viewId) => <li key={viewId}>{viewId}</li>}
//      </ul>
//    </div>
//   )`}
//             />
//           </>
//         }
//       />
//     ),
//     navItems: GenericDocNav('useStateTogether'),
//   }
// }

// function DocumentUseIsTogether() {
//   return {
//     content: (
//       <GenericDocPage
//         title='useIsTogether'
//         description={'The useIsTogether hook returns true if the user is connected to a React Together session, and false otherwise.'}
//         usage={
//           <>
//             <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
//             <CodeBlock language='javascript' code1={`const isTogether = useIsTogether()`} />
//           </>
//         }
//       />
//     ),
//     navItems: GenericDocNav('useStateTogether'),
//   }
// }

// function DocumentUseConnectNewSession() {
//   return {
//     content: (
//       <GenericDocPage
//         title='useConnectNewSession'
//         description={'The useConnectNewSession hook returns a function that when called, connects to a new React Together session.'}
//         usage={
//           <>
//             <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
//             <CodeBlock
//               language='javascript'
//               code1={`const connectNewSession = useConnectNewSession()

// return (
//   <button onClick={() => connectNewSession()}>
//     Connect to a new session!
//   </button>
// )`}
//             />
//           </>
//         }
//       />
//     ),
//     navItems: GenericDocNav('useStateTogether'),
//   }
// }

// function DocumentUseLeaveSession() {
//   return {
//     content: (
//       <GenericDocPage
//         title='useLeaveSession'
//         description={
//           'The useLeaveSession hook returns a function that when called, disconnects the user from the current React Together session. If the user is not connected to any session, calling that function has no effect.'
//         }
//         usage={
//           <>
//             <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
//             <CodeBlock
//               language='javascript'
//               code1={`const leaveSession = useLeaveSession()

// return (
//   <button onClick={() => leaveSession()}>
//     Leave current session!
//   </button>
// )`}
//             />
//           </>
//         }
//       />
//     ),
//     navItems: GenericDocNav('useStateTogether'),
//   }
// }

// function Introduction() {
//   return {
//     content: <IntroductionPage />,
//     navItems: introductionNavItems,
//   }
// }

// function PresenceDivDocumentation(): ComponentReturn {
//   return {
//     content: (
//       <GenericDocPage
//         title='PresenceDiv'
//         description='This component uses the useHoveringViews hook to render a div that is highlighted whenever a view is hovering it.'
//         usage={
//           <>
//             <CodeBlock language='javascript' code1={`import { ReactTogether } from 'react-together'`} />
//             <CodeBlock
//               language='javascript'
//               code1={`return (
//   <PresenceDiv rtid={rtid}>
//     <YourComponent/>
//   </PresenceDiv>
// )`}
//             />
//           </>
//         }
//       />
//     ),
//     navItems: GenericDocNav('PresenceDiv'),
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
  // '': Introduction,
  // 'get-started': Introduction,
  // 'get-started/introduction': Introduction,
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
  // 'primereact/radiobuttontogether': PrimeReactRatingTogetherDocumentationPage,
  'primereact/ratingtogether': PrimeReactRatingTogetherDocumentationPage,
  'primereact/selectbuttontogether': PrimeReactSelectButtonTogetherDocumentationPage,
  'primereact/tabviewtogether': PrimeReactTabViewTogetherDocumentationPage,
  'primereact/togglebuttontogether': PrimeReactToggleButtonTogetherDocumentationPage,
  'primereact/tristatecheckboxtogether': PrimeReactTriStateCheckboxTogetherDocumentationPage,
  // 'hooks/useStateTogether': DocumentUseStateTogether,
  // 'hooks/useStateTogetherWithPerUserValues': DocumentUseStateTogetherWithPerUserValues,
  // 'hooks/useConnectedUsers': DocumentUseConnectedUsers,
  // 'hooks/useHoveringViews': DocumentUseHoveringViews,
  // 'hooks/useIsTogether': DocumentUseIsTogether,
  // 'hooks/useConnectNewSession': DocumentUseConnectNewSession,
  // 'hooks/useLeaveSession': DocumentUseLeaveSession,
  // 'discover/about-us': AboutUs,
  // 'discover/roadmap': RoadMap,
}

export function DocumentationPage({ keyToLookupWith, content, navItems }) {
  // const { slug1, slug2 } = useParams()
  // const keyToLookupWith = `${slug1}/${slug2}`
  // const Component = lookup[keyToLookupWith] || (() => ({ content: <div>unknown</div>, navItems: [] }))
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
  return <PresenceDivDocumentationPage />
}
