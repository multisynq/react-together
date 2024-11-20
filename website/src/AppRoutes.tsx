import {
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
  UseConnectedUsersDocumentationPage,
  UseCreateRandomSessionDocumentationPage,
  UseFunctionTogetherDocumentationPage,
  UseHoveringUsersDocumentationPage,
  UseIsTogetherDocumentationPage,
  UseJoinUrlDocumentationPage,
  UseLeaveSessionDocumentationPage,
  UseMyIdDocumentationPage,
  UseStateTogetherDocumentationPage,
  UseStateTogetherWithPerUserValuesDocumentationPage,
} from '@pages/Documentation'
import { ConnectedUsers } from 'react-together'
import { HomePage } from './pages/HomePage'

import {
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
  UseStateTogetherWPUVDemo,
} from '@components/demo'
import CountButtonTogether from '@components/demo/CountButtonTogether'
import { DynamicsSession } from '@components/demo/DynamicSessions'
import HeroDemo from '@components/demo/HeroDemo'
import TinyRpgTogether from '@components/demo/TinyRpg'
import { DemoWrapper } from '@pages/DemoWrapper'
import { DocumentationWrapper } from '@pages/Documentation/DocumentationWrapper'
import { MarkdownPage } from '@pages/Documentation/MarkdownPage'
import { HackTogetherPage } from '@pages/HackTogetherPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { UseCaseProject } from '@pages/UseCaseProjects'
import { WebsiteWrapper } from '@pages/WebsiteWrapper'
import { Navigate, Route, Routes } from 'react-router-dom'
import changelog from 'react-together/CHANGELOG.md'
import contributing from '../../contributing/CONTRIBUTING.md'
import pricing from './pages/Documentation/pricing/PRICING.md'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<WebsiteWrapper />}>
        <Route path='hackathon' element={<HackTogetherPage />} />
        <Route path='examples' element={<UseCaseProject />} />
        <Route path='/' element={<HomePage />} />
        <Route element={<DocumentationWrapper />}>
          <Route path='getting-started' element={<IntroductionPage />} />
          <Route path='ReactTogether' element={<ReactTogetherDocumentationPage />} />
          <Route path='SessionManager' element={<SessionManagerDocumentationPage />} />
          <Route path='ConnectedUsers' element={<ConnectedUsersDocumentationPage />} />
          <Route path='HoverHighlighter' element={<HoverHighlighterDocumentationPage />} />
          <Route path='useStateTogether' element={<UseStateTogetherDocumentationPage />} />
          <Route path='useStateTogetherWithPerUserValues' element={<UseStateTogetherWithPerUserValuesDocumentationPage />} />
          <Route path='useConnectedUsers' element={<UseConnectedUsersDocumentationPage />} />
          <Route path='useMyId' element={<UseMyIdDocumentationPage />} />
          <Route path='useHoveringUsers' element={<UseHoveringUsersDocumentationPage />} />
          <Route path='useIsTogether' element={<UseIsTogetherDocumentationPage />} />
          <Route path='useCreateRandomSession' element={<UseCreateRandomSessionDocumentationPage />} />
          <Route path='useJoinUrl' element={<UseJoinUrlDocumentationPage />} />
          <Route path='useLeaveSession' element={<UseLeaveSessionDocumentationPage />} />
          <Route path='useFunctionTogether' element={<UseFunctionTogetherDocumentationPage />} />
          <Route path='utils' element={<HelpersDocumentationPage />} />
          <Route path='/contributing' element={<MarkdownPage markdown={contributing} />} />
          <Route path='/pricing' element={<MarkdownPage markdown={pricing} />} />
          <Route path='/examples' element={<DynamicsSession />} />
          <Route path='/changelog' element={<MarkdownPage markdown={changelog} />} />
          <Route path='primereact'>
            {/* <Route path='Calendar' element={<PrimeReactCalendarTogetherDocumentationPage />} /> */}
            <Route path='Checkbox' element={<PrimeReactCheckboxTogetherDocumentationPage />} />
            <Route path='ColorPicker' element={<PrimeReactColorPickerTogetherDocumentationPage />} />
            <Route path='Dropdown' element={<PrimeReactDropdownTogetherDocumentationPage />} />
            <Route path='InputSwitch' element={<PrimeReactInputSwitchTogetherDocumentationPage />} />
            <Route path='Knob' element={<PrimeReactKnobTogetherDocumentationPage />} />
            <Route path='Multiselect' element={<PrimeReactMultiSelectTogetherDocumentationPage />} />
            <Route path='Rating' element={<PrimeReactRatingTogetherDocumentationPage />} />
            <Route path='SelectButton' element={<PrimeReactSelectButtonTogetherDocumentationPage />} />
            <Route path='TabView' element={<PrimeReactTabViewTogetherDocumentationPage />} />
            <Route path='ToggleButton' element={<PrimeReactToggleButtonTogetherDocumentationPage />} />
            <Route path='TriStateCheckbox' element={<PrimeReactTriStateCheckboxTogetherDocumentationPage />} />
          </Route>
        </Route>
        <Route path='docs' element={<Navigate to='/getting-started' />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route path='demos' element={<DemoWrapper />}>
        <Route path='HeroDemo' element={<HeroDemo />} />
        <Route path='CountButtonTogether' element={<CountButtonTogether />} />
        <Route path='useStateTogetherWithPerUserValues' element={<UseStateTogetherWPUVDemo />} />
        <Route path='SessionManager' element={<SessionManagerDemo />} />
        <Route path='ConnectedUsers' element={<ConnectedUsers />} />
        <Route path='HoverHighlighter' element={<HoverHighlighterDemo />} />
        <Route path='useFunctionTogether' element={<MeditationBell />} />
        <Route path='primereact'>
          {/* <Route path='Calendar' element={<PrimeReactCalendarTogetherDemo />} /> */}
          <Route path='Checkbox' element={<PrimeReactCheckboxTogetherDemo />} />
          <Route path='ColorPicker' element={<PrimeReactColorPickerTogetherDemo />} />
          <Route path='Dropdown' element={<PrimeReactDropdownTogetherDemo />} />
          <Route path='InputSwitch' element={<PrimeReactInputSwitchTogetherDemo />} />
          <Route path='Knob' element={<PrimeReactKnobTogetherDemo />} />
          <Route path='Multiselect' element={<PrimeReactMultiSelectTogetherDemo />} />
          <Route path='Rating' element={<PrimeReactRatingTogetherDemo />} />
          <Route path='SelectButton' element={<PrimeReactSelectButtonTogetherDemo />} />
          <Route path='TabView' element={<PrimeReactTabViewTogetherDemo />} />
          <Route path='ToggleButton' element={<PrimeReactToggleButtonTogetherDemo />} />
          <Route path='TriStateCheckbox' element={<PrimeReactTriStateCheckboxTogetherDemo />} />
        </Route>
        <Route path='TinyRpg' element={<TinyRpgTogether />} />
      </Route>
    </Routes>
  )
}
