import { CodeBlock } from '@components/ui/CodeBlock'
import DocumentBreadCrumb from '@components/ui/DocumentBreadCrumb'
import DocumentNav from '@components/ui/DocumentNav'
import PageNav from '@components/ui/PageNav'
import { useParams } from 'react-router-dom'
import { AboutUsPage, aboutUsNavItems } from './documentation/AboutUsPage'
import { ConfigurationPage, configurationNavItems } from './documentation/ConfigurationPage'
import { GenericComponentDocPage } from './documentation/GenericComponentDocPage'
import { GenericDocNav, GenericDocPage } from './documentation/GenericDocPage'
import { IntroductionPage, introductionNavItems } from './documentation/IntroductionPage'
import { RoadmapPage, roadMapNavItems } from './documentation/RoadmapPage'
import { PrimeReactCalendarTogetherDemo } from './documentation/componentDemos/PrimeReactCalendarTogetherDemo'
import { PrimeReactCheckboxTogetherDemo } from './documentation/componentDemos/PrimeReactCheckboxTogetherDemo'
import { PrimeReactDropdownTogetherDemo } from './documentation/componentDemos/PrimeReactDropdownTogetherDemo'
import { PrimeReactInputSwitchTogetherDemo } from './documentation/componentDemos/PrimeReactInputSwitchTogetherDemo'
import { PrimeReactKnobTogetherDemo } from './documentation/componentDemos/PrimeReactKnobTogetherDemo'
import { PrimeReactMultiSelectTogetherDemo } from './documentation/componentDemos/PrimeReactMultiSelectTogetherDemo'
import { PrimeReactRatingTogetherDemo } from './documentation/componentDemos/PrimeReactRatingTogetherDemo'
import { PrimeReactSelectButtonTogetherDemo } from './documentation/componentDemos/PrimeReactSelectButtonTogetherDemo'
import { PrimeReactTabViewTogetherDemo } from './documentation/componentDemos/PrimeReactTabViewTogetherDemo'
import { PrimeReactToggleButtonDemo } from './documentation/componentDemos/PrimeReactToggleButtonTogetherDemo'
import { PrimeReactTriStateCheckboxDemo } from './documentation/componentDemos/PrimeReactTriStateCheckboxTogetherDemo'
import { ComponentReturn } from './documentation/types'
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
    navItems: GenericDocNav(newName),
  }
}

function PrimeReactCalendarTogether() {
  return PrimeReactComponent('Calendar', PrimeReactCalendarTogetherDemo)
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

function DocumentUseStateTogether() {
  return {
    content: (
      <GenericDocPage
        title='useStateTogether'
        description='The useStateTogether hook makes every user see the same state simultaneously. If the user is not connected to any session, then this hook behaves as a normal useState.'
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
            <CodeBlock
              language='javascript'
              code1={`const [count, setCount] = useStateTogether('unique-id', 0)

const increment = () => setCount((prev) => prev + 1)
const reset = () => setCount(0)`}
            />
          </>
        }
      />
    ),
    navItems: GenericDocNav('useStateTogether'),
  }
}

function DocumentUseStateTogetherWithPerUserValues() {
  return {
    content: (
      <GenericDocPage
        title='useStateTogetherWithPerUserValues'
        description={
          'The useStateTogetherWithValuesPerUser hook allows users to read the state of all of their peers. ' +
          'If the user is not connected to any session, then the hook will behave as a normal useState, and the peer state object will be empty.'
        }
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
            <CodeBlock
              language='javascript'
              code1={`const [count, setCount, countPerUser] = useStateTogetherWithPerUserValues('unique-id', 0)

const increment = () => setCount((prev) => prev + 1)
const reset = () => setCount(0)`}
            />
          </>
        }
      />
    ),
    navItems: GenericDocNav('useStateTogether'),
  }
}

function DocumentUseConnectedUsers() {
  return {
    content: (
      <GenericDocPage
        title='useConnectedUsers'
        description={
          'The useConnectedUsers hook returns an array of objects representing all the views that are connected to the current session.'
        }
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
            <CodeBlock
              language='javascript'
              code1={`const connectedUsers = useConnectedUsers()

 return (
   <div ref={ref}>
     Connected users:
     <ul>
       {hoveringViews.map((viewId) => <li key={viewId}>{viewId}</li> }
     </ul>
   </div>
  )`}
            />
          </>
        }
      />
    ),
    navItems: GenericDocNav('useStateTogether'),
  }
}

function DocumentUseHoveringViews() {
  return {
    content: (
      <GenericDocPage
        title='useHoveringViews'
        description={
          'The useHoveringViews hook is used to tell which views are hovering a given DOM element. If a view is hovering a component that is nested on other “hoverable” components, only the innermost will tell that view is hovering it.'
        }
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
            <CodeBlock
              language='javascript'
              code1={`const [ref, hoveringViews] = useHoveringViews(‘hovering-views’)

 return (
   <div>
     <div ref={ref}> Hover me! </div>
     <h3>Hovering Ids:</h3>
     <ul>
       {hoveringViews.map((viewId) => <li key={viewId}>{viewId}</li>}
     </ul>
   </div>
  )`}
            />
          </>
        }
      />
    ),
    navItems: GenericDocNav('useStateTogether'),
  }
}

function DocumentUseIsTogether() {
  return {
    content: (
      <GenericDocPage
        title='useIsTogether'
        description={'The useIsTogether hook returns true if the user is connected to a React Together session, and false otherwise.'}
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
            <CodeBlock language='javascript' code1={`const isTogether = useIsTogether()`} />
          </>
        }
      />
    ),
    navItems: GenericDocNav('useStateTogether'),
  }
}

function DocumentUseConnectNewSession() {
  return {
    content: (
      <GenericDocPage
        title='useConnectNewSession'
        description={'The useConnectNewSession hook returns a function that when called, connects to a new React Together session.'}
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
            <CodeBlock
              language='javascript'
              code1={`const connectNewSession = useConnectNewSession()

return (
  <button onClick={() => connectNewSession()}>
    Connect to a new session!
  </button>
)`}
            />
          </>
        }
      />
    ),
    navItems: GenericDocNav('useStateTogether'),
  }
}

function DocumentUseLeaveSession() {
  return {
    content: (
      <GenericDocPage
        title='useLeaveSession'
        description={
          'The useLeaveSession hook returns a function that when called, disconnects the user from the current React Together session. If the user is not connected to any session, calling that function has no effect.'
        }
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
            <CodeBlock
              language='javascript'
              code1={`const leaveSession = useLeaveSession()

return (
  <button onClick={() => leaveSession()}>
    Leave current session!
  </button>
)`}
            />
          </>
        }
      />
    ),
    navItems: GenericDocNav('useStateTogether'),
  }
}

function Introduction() {
  return {
    content: <IntroductionPage />,
    navItems: introductionNavItems,
  }
}

function ReactTogether(): ComponentReturn {
  return {
    content: (
      <GenericDocPage
        title='ReactTogether'
        description='This component provides the context required to synchronize multiple users within the same session. Every React Together hook and component you use should be inside the scope of this component.'
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { ReactTogether } from 'react-together'`} />
            <CodeBlock
              language='javascript'
              code1={`ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <App />
    </ReactTogether>
  </React.StrictMode>
)`}
            />
          </>
        }
      />
    ),
    navItems: GenericDocNav('ReactTogether'),
  }
}

function ConnectedViewsDocumentation(): ComponentReturn {
  return {
    content: (
      <GenericDocPage
        title='ConnectedViews'
        description='This component uses the useConnectedViews hook to display the views that are connected to the current React Together session.'
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { ConnectedViews } from 'react-together'`} />
            <CodeBlock language='javascript' code1={`return <ConnectedViews/>`} />
          </>
        }
      />
    ),
    navItems: GenericDocNav('ConnectedViews'),
  }
}

function PresenceDivDocumentation(): ComponentReturn {
  return {
    content: (
      <GenericDocPage
        title='PresenceDiv'
        description='This component uses the useHoveringViews hook to render a div that is highlighted whenever a view is hovering it.'
        usage={
          <>
            <CodeBlock language='javascript' code1={`import { ReactTogether } from 'react-together'`} />
            <CodeBlock
              language='javascript'
              code1={`return (
  <PresenceDiv rtid={rtid}>
    <YourComponent/>
  </PresenceDiv>
)`}
            />
          </>
        }
      />
    ),
    navItems: GenericDocNav('PresenceDiv'),
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
  'components/ReactTogether': ReactTogether,
  'components/ConnectedViews': ConnectedViewsDocumentation,
  'components/PresenceDiv': PresenceDivDocumentation,
  'primereact/calendartogether': PrimeReactCalendarTogether,
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
  'hooks/useStateTogether': DocumentUseStateTogether,
  'hooks/useStateTogetherWithPerUserValues': DocumentUseStateTogetherWithPerUserValues,
  'hooks/useConnectedUsers': DocumentUseConnectedUsers,
  'hooks/useHoveringViews': DocumentUseHoveringViews,
  'hooks/useIsTogether': DocumentUseIsTogether,
  'hooks/useConnectNewSession': DocumentUseConnectNewSession,
  'hooks/useLeaveSession': DocumentUseLeaveSession,
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
