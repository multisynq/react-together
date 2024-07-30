import {
  ConnectedViewsDocumentationPage,
  IntroductionPage,
  PresenceDivDocumentationPage,
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
  UseConnectedViewsDocumentationPage,
  UseHoveringViewsDocumentationPage,
  UseStateTogetherDocumentationPage,
  UseStateTogetherWithPerUserValuesDocumentationPage,
} from '@pages/Documentation'
import { HomePage } from './pages/HomePage'

import { DocumentationWrapper } from '@pages/Documentation/DocumentationWrapper'
import { Route, Routes } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <Routes>
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
        <Route path='primereact'>
          {/* <Route path='Calendar' element={<PrimeReactCalendarTogetherDocumentationPage />} /> */}
          <Route path='Checkbox' element={<PrimeReactCheckboxTogetherDocumentationPage />} />
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
    </Routes>
  )
}
