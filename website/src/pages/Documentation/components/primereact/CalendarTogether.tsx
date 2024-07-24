import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { CalendarTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactCalendarTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      {/* <CalendarTogether rtid='calendar-doc-demo' /> */}
      Hello
    </div>
  )
}

export default function PrimeReactCalendarTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='CalendarTogether'
      originalName='Calendar'
      docUrl={`https://primereact.org/calendartogether/`}
      ComponentDemo={PrimeReactCalendarTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('CalendarTogether')} keyToLookupWith='' />
}
