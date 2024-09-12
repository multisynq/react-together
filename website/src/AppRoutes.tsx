import {
  ConnectedViewsDocumentationPage,
  IntroductionPage,
  PresenceDivDocumentationPage,
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
  UseConnectedViewsDocumentationPage,
  UseHoveringViewsDocumentationPage,
  UseStateTogetherDocumentationPage,
  UseStateTogetherWithPerUserValuesDocumentationPage,
} from '@pages/Documentation'
import { HomePage } from './pages/HomePage'

import {
  PresenceDivDemo,
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
  UseStateTogetherWPUVDemo,
} from '@components/demo'
import CountButtonTogether from '@components/demo/CountButtonTogether'
import HeroDemo from '@components/demo/HeroDemo'
import TinyRpgTogether from '@components/demo/TinyRpg'
import { DemoWrapper } from '@pages/DemoWrapper'
import { DocumentationWrapper } from '@pages/Documentation/DocumentationWrapper'
import { MarkdownPage } from '@pages/Documentation/MarkdownPage'
import { HackTogetherPage } from '@pages/HackTogetherPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { WebsiteWrapper } from '@pages/WebsiteWrapper'
import { Route, Routes } from 'react-router-dom'
import { ConnectedViews } from 'react-together'
import changelog from 'react-together/CHANGELOG.md'
import contributing from '../../contributing/CONTRIBUTING.md'
import pricing from './pages/Documentation/pricing/PRICING.md'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<WebsiteWrapper />}>
        <Route path='hackathon' element={<HackTogetherPage />} />
        <Route path='/' element={<HomePage />} />
        <Route element={<DocumentationWrapper />}>
          <Route path='getting-started' element={<IntroductionPage />} />
          <Route path='ReactTogether' element={<ReactTogetherDocumentationPage />} />
          <Route path='ConnectedViews' element={<ConnectedViewsDocumentationPage />} />
          <Route path='PresenceDiv' element={<PresenceDivDocumentationPage />} />
          <Route path='useStateTogether' element={<UseStateTogetherDocumentationPage />} />
          <Route path='useStateTogetherWithPerUserValues' element={<UseStateTogetherWithPerUserValuesDocumentationPage />} />
          <Route path='useConnectedViews' element={<UseConnectedViewsDocumentationPage />} />
          <Route path='useHoveringViews' element={<UseHoveringViewsDocumentationPage />} />
          {/* <Route path='useIsTogether' element={<UseIsTogetherDocumentationPage />} />
          <Route path='useConnectNewSession' element={<UseConnectNewSessionDocumentationPage />} />
          <Route path='useLeaveSession' element={<UseLeaveSessionDocumentationPage />} /> */}
          <Route path='/contributing' element={<MarkdownPage markdown={contributing} />} />
          <Route path='/pricing' element={<MarkdownPage markdown={pricing} />} />
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
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route path='demos' element={<DemoWrapper />}>
        <Route path='HeroDemo' element={<HeroDemo />} />
        <Route path='CountButtonTogether' element={<CountButtonTogether />} />
        <Route path='useStateTogetherWithPerUserValues' element={<UseStateTogetherWPUVDemo />} />
        <Route path='ConnectedViews' element={<ConnectedViews />} />
        <Route path='PresenceDiv' element={<PresenceDivDemo />} />
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
