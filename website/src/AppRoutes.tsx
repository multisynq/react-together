import {
    AntDesignCheckboxTogetherDocumentationPage,
    AntDesignDatePickerTogetherDocumentationPage,
    AntDesignMultiSelectTogetherDocumentationPage,
    AntDesignRateTogetherDocumentationPage,
    AntDesignSelectButtonTogetherDocumentationPage,
    AntDesignSelectTogetherDocumentationPage,
    AntDesignSliderTogetherDocumentationPage,
    AntDesignSwitchTogetherDocumentationPage,
    AntDesignToggleButtonTogetherDocumentationPage,
    ChatDocumentationPage,
    ConnectedUsersDocumentationPage,
    HelpersDocumentationPage,
    HoverHighlighterDocumentationPage,
    IntroductionPage,
    PrimeReactCheckboxTogetherDocumentationPage,
    PrimeReactColorPickerTogetherDocumentationPage,
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
    SessionManagerDocumentationPage,
    UseAllNicknamesDocumentationPage,
    UseChatDocumentationPage,
    UseConnectedUsersDocumentationPage,
    UseCreateRandomSessionDocumentationPage,
    UseCursorsDocumentationPage,
    UseFunctionTogetherDocumentationPage,
    UseHoveringUsersDocumentationPage,
    UseIsTogetherDocumentationPage,
    UseJoinUrlDocumentationPage,
    UseLeaveSessionDocumentationPage,
    UseMyIdDocumentationPage,
    UseNicknameDocumentationPage,
    UseStateTogetherDocumentationPage,
    UseStateTogetherWithPerUserValuesDocumentationPage,
} from '@pages/Documentation'
import { ConnectedUsers } from 'react-together'
import { HomePage } from './pages/HomePage'

import { CookieBanner } from '@components/CookieBanner'
import {
    AntDesignCheckboxTogetherDemo,
    AntDesignDatePickerTogetherDemo,
    AntDesignMultiSelectTogetherDemo,
    AntDesignRateTogetherDemo,
    AntDesignSelectButtonTogetherDemo,
    AntDesignSelectTogetherDemo,
    AntDesignSliderTogetherDemo,
    AntDesignSwitchTogetherDemo,
    AntDesignToggleButtonTogetherDemo,
    ChatDemo,
    CursorsDemo,
    HoverHighlighterDemo,
    MeditationBell,
    PrimeReactCheckboxTogetherDemo,
    PrimeReactColorPickerTogetherDemo,
    PrimeReactDropdownTogetherDemo,
    PrimeReactInputSwitchTogetherDemo,
    PrimeReactKnobTogetherDemo,
    PrimeReactMultiSelectTogetherDemo,
    PrimeReactRatingTogetherDemo,
    PrimeReactSelectButtonTogetherDemo,
    PrimeReactTabViewTogetherDemo,
    PrimeReactToggleButtonTogetherDemo,
    PrimeReactTriStateCheckboxTogetherDemo,
    SessionManagerDemo,
    UseAllNicknamesDemo,
    UseChatDemo,
    UseConnectedUsersDemo,
    UseCursorsDemo,
    UseNicknamesDemo,
    UseStateTogetherWPUVDemo,
} from '@components/demo'

import CountButtonTogether from '@components/demo/CountButtonTogether'
import HeroDemo from '@components/demo/HeroDemo'
import TinyRpgTogether from '@components/demo/TinyRpg'
import { CookiePolicy } from '@pages/CookiePolicy'
import { DemoWrapper } from '@pages/DemoWrapper'
import CursorsDocumentationPage from '@pages/Documentation/components/reactTogether/Cursors'
import DependenciesPage from '@pages/Documentation/DependenciesPage'
import { DocumentationWrapper } from '@pages/Documentation/DocumentationWrapper'
import { MarkdownPage } from '@pages/Documentation/MarkdownPage'
import { HackTogetherPage } from '@pages/HackTogetherPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { WebsiteWrapper } from '@pages/WebsiteWrapper'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import changelog from 'react-together/CHANGELOG.md'
import contributing from '../../contributing/CONTRIBUTING.md'
import multisynq from './pages/Documentation/multisynq-react.md'
import pricing from './pages/Documentation/pricing/PRICING.md'

function GlobalWrapper() {
  return (
    <>
      <Outlet />
      <CookieBanner />
    </>
  )
}

export default function AppRoutes() {
  // prettier-ignore
  return (
    <Routes>
      <Route element={<GlobalWrapper />}>
        <Route element={<WebsiteWrapper />}>
          <Route path='hackathon' element={<HackTogetherPage />} />
          {/* <Route path='examples' element={<UseCaseProject />} /> */}
          <Route path='/' element={<HomePage />} />
          <Route path='/cookies' element={<CookiePolicy />} />
          <Route element={<DocumentationWrapper />}>
            <Route path='getting-started'                   element={<IntroductionPage                                   />} />
            <Route path='Dependencies'                      element={<DependenciesPage                                   />} />
            <Route path='ReactTogether'                     element={<ReactTogetherDocumentationPage                     />} />
            <Route path='SessionManager'                    element={<SessionManagerDocumentationPage                    />} />
            <Route path='ConnectedUsers'                    element={<ConnectedUsersDocumentationPage                    />} />
            <Route path='HoverHighlighter'                  element={<HoverHighlighterDocumentationPage                  />} />
            <Route path='Cursors'                           element={<CursorsDocumentationPage                           />} />
            <Route path='Chat'                              element={<ChatDocumentationPage                              />} />
            <Route path='useStateTogether'                  element={<UseStateTogetherDocumentationPage                  />} />
            <Route path='useStateTogetherWithPerUserValues' element={<UseStateTogetherWithPerUserValuesDocumentationPage />} />
            <Route path='useConnectedUsers'                 element={<UseConnectedUsersDocumentationPage                 />} />
            <Route path='useMyId'                           element={<UseMyIdDocumentationPage                           />} />
            <Route path='useHoveringUsers'                  element={<UseHoveringUsersDocumentationPage                  />} />
            <Route path='useIsTogether'                     element={<UseIsTogetherDocumentationPage                     />} />
            <Route path='useCreateRandomSession'            element={<UseCreateRandomSessionDocumentationPage            />} />
            <Route path='useJoinUrl'                        element={<UseJoinUrlDocumentationPage                        />} />
            <Route path='useLeaveSession'                   element={<UseLeaveSessionDocumentationPage                   />} />
            <Route path='useFunctionTogether'               element={<UseFunctionTogetherDocumentationPage               />} />
            <Route path='useChat'                           element={<UseChatDocumentationPage                           />} />
            <Route path='useAllNicknames'                   element={<UseAllNicknamesDocumentationPage                   />} />
            <Route path='useNicknames'                      element={<UseNicknameDocumentationPage                       />} />
            <Route path='useCursors'                        element={<UseCursorsDocumentationPage                        />} />
            <Route path='utils'                             element={<HelpersDocumentationPage                           />} />
            <Route path='multisynq'                           element={<MarkdownPage markdown={multisynq}                    />} />
            <Route path='/contributing'                     element={<MarkdownPage markdown={contributing}               />} />
            <Route path='/pricing'                          element={<MarkdownPage markdown={pricing}                    />} />
            {/* <Route path='/examples'                         element={<DynamicsSession                                    />} /> */}
            <Route path='/changelog'                        element={<MarkdownPage markdown={changelog}                  />} />
            <Route path='antdesign'>
              <Route path='Checkbox'     element={<AntDesignCheckboxTogetherDocumentationPage     />} />
              <Route path='DatePicker'   element={<AntDesignDatePickerTogetherDocumentationPage   />} />
              <Route path='Select'       element={<AntDesignSelectTogetherDocumentationPage     />} />
              <Route path='Switch'       element={<AntDesignSwitchTogetherDocumentationPage  />} />
              <Route path='MultiSelect'  element={<AntDesignMultiSelectTogetherDocumentationPage  />} />
              <Route path='Rate'         element={<AntDesignRateTogetherDocumentationPage       />} />
              <Route path='SelectButton' element={<AntDesignSelectButtonTogetherDocumentationPage />} />
              <Route path='Slider'       element={<AntDesignSliderTogetherDocumentationPage       />} />
              <Route path='ToggleButton' element={<AntDesignToggleButtonTogetherDocumentationPage />} />
            </Route>
            <Route path='primereact'>
              {/* <Route path='Calendar'         element={<PrimeReactCalendarTogetherDocumentationPage         />} /> */}
              <Route path='Checkbox'         element={<PrimeReactCheckboxTogetherDocumentationPage         />} />
              <Route path='ColorPicker'      element={<PrimeReactColorPickerTogetherDocumentationPage      />} />
              <Route path='Dropdown'         element={<PrimeReactDropdownTogetherDocumentationPage         />} />
              <Route path='InputSwitch'      element={<PrimeReactInputSwitchTogetherDocumentationPage      />} />
              <Route path='Knob'             element={<PrimeReactKnobTogetherDocumentationPage             />} />
              <Route path='Multiselect'      element={<PrimeReactMultiSelectTogetherDocumentationPage      />} />
              <Route path='Rating'           element={<PrimeReactRatingTogetherDocumentationPage           />} />
              <Route path='SelectButton'     element={<PrimeReactSelectButtonTogetherDocumentationPage     />} />
              <Route path='TabView'          element={<PrimeReactTabViewTogetherDocumentationPage          />} />
              <Route path='ToggleButton'     element={<PrimeReactToggleButtonTogetherDocumentationPage     />} />
              <Route path='TriStateCheckbox' element={<PrimeReactTriStateCheckboxTogetherDocumentationPage />} />
            </Route>
          </Route>
        </Route>
        <Route path='docs' element={<Navigate to='/getting-started' />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route path='demos' element={<DemoWrapper />}>
        <Route path='Chat'                              element={<ChatDemo                 />} />
        <Route path='ConnectedUsers'                    element={<ConnectedUsers           />} />
        <Route path='CountButtonTogether'               element={<CountButtonTogether      />} />
        <Route path='Cursors'                           element={<CursorsDemo              />} />
        <Route path='HeroDemo'                          element={<HeroDemo                 />} />
        <Route path='HoverHighlighter'                  element={<HoverHighlighterDemo     />} />
        <Route path='SessionManager'                    element={<SessionManagerDemo       />} />
        <Route path='useAllNicknames'                   element={<UseAllNicknamesDemo      />} />
        <Route path='useChat'                           element={<UseChatDemo              />} />
        <Route path='useConnectedUsers'                 element={<UseConnectedUsersDemo    />} />
        <Route path='useCursors'                        element={<UseCursorsDemo           />} />
        <Route path='useFunctionTogether'               element={<MeditationBell           />} />
        <Route path='useNicknames'                      element={<UseNicknamesDemo         />} />
        <Route path='useStateTogetherWithPerUserValues' element={<UseStateTogetherWPUVDemo />} />
        <Route path='primereact'>
          {/* <Route path='Calendar'         element={<PrimeReactCalendarTogetherDemo         />} /> */}
          <Route path='Checkbox'         element={<PrimeReactCheckboxTogetherDemo         />} />
          <Route path='ColorPicker'      element={<PrimeReactColorPickerTogetherDemo      />} />
          <Route path='Dropdown'         element={<PrimeReactDropdownTogetherDemo         />} />
          <Route path='InputSwitch'      element={<PrimeReactInputSwitchTogetherDemo      />} />
          <Route path='Knob'             element={<PrimeReactKnobTogetherDemo             />} />
          <Route path='Multiselect'      element={<PrimeReactMultiSelectTogetherDemo      />} />
          <Route path='Rating'           element={<PrimeReactRatingTogetherDemo           />} />
          <Route path='SelectButton'     element={<PrimeReactSelectButtonTogetherDemo     />} />
          <Route path='TabView'          element={<PrimeReactTabViewTogetherDemo          />} />
          <Route path='ToggleButton'     element={<PrimeReactToggleButtonTogetherDemo     />} />
          <Route path='TriStateCheckbox' element={<PrimeReactTriStateCheckboxTogetherDemo />} />
        </Route>
        <Route path='antdesign'>
          <Route path='Checkbox'     element={ <AntDesignCheckboxTogetherDemo /> } />
          <Route path='DatePicker'   element={ <AntDesignDatePickerTogetherDemo /> } />
          <Route path='Select'       element={ <AntDesignSelectTogetherDemo /> } />
          <Route path='Switch'       element={ <AntDesignSwitchTogetherDemo /> } />
          <Route path='MultiSelect'  element={ <AntDesignMultiSelectTogetherDemo /> } />
          <Route path='Rate'         element={ <AntDesignRateTogetherDemo /> } />
          <Route path='SelectButton' element={ <AntDesignSelectButtonTogetherDemo /> } />
          <Route path='Slider'       element={ <AntDesignSliderTogetherDemo /> } />
          <Route path='Button'       element={ <AntDesignToggleButtonTogetherDemo /> } />
        </Route>
        <Route path='TinyRpg' element={<TinyRpgTogether />} />
      </Route>
    </Routes>
  )
}
