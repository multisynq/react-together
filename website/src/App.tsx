import '@styles/Comps.scss'
import '@styles/globals.css'
import '@styles/mdx.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import './App.scss'

import { SiteFooter, SiteHeader } from '@components'
import { version } from '@package'
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
  UseConnectedViewsDocumentationPage,
  UseConnectNewSessionDocumentationPage,
  UseHoveringViewsDocumentationPage,
  UseIsTogetherDocumentationPage,
  UseLeaveSessionDocumentationPage,
  UseStateTogetherDocumentationPage,
  UseStateTogetherWithPerUserValuesDocumentationPage,
} from '@pages/documentation'
import { Helmet } from 'react-helmet'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <div className='h-100 w-100'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' rel='stylesheet' />
      </Helmet>
      <BrowserRouter>
        <SiteHeader />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='ReactTogether' element={<ReactTogetherDocumentationPage />} />
          <Route path='ConnectedViews' element={<ConnectedViewsDocumentationPage />} />
          <Route path='PresenceDiv' element={<PresenceDivDocumentationPage />} />
          <Route path='useStateTogether' element={<UseStateTogetherDocumentationPage />} />
          <Route path='useStateTogetherWithPerUserValues' element={<UseStateTogetherWithPerUserValuesDocumentationPage />} />
          <Route path='useConnectedViews' element={<UseConnectedViewsDocumentationPage />} />
          <Route path='useHoveringViews' element={<UseHoveringViewsDocumentationPage />} />
          <Route path='useIsTogether' element={<UseIsTogetherDocumentationPage />} />
          <Route path='useConnectNewSession' element={<UseConnectNewSessionDocumentationPage />} />
          <Route path='useLeaveSession' element={<UseLeaveSessionDocumentationPage />} />
          <Route path='primereact'>
            <Route path='Calendar' element={<PrimeReactCalendarTogetherDocumentationPage />} />
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
          {/* <Route path='/docs/:slug1/:slug2?' element={<DocumentationPage />} /> */}
        </Routes>
        <SiteFooter />
      </BrowserRouter>

      <div className='version-num'>{version}</div>
    </div>
  )
}
