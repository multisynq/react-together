import { TableContainer } from '@components/ui/TableContainer'
import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { CalendarTogether } from '../../../../../../../react-together'
import NewPropSpan from '@components/ui/NewPropSpan'
import RemovedPropSpan from '@components/ui/RemovedPropSpan'
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
  const api = (
    <>
      <h5>Params</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'default', label: 'Default Value' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: <NewPropSpan text='rtid' />,
            type: 'string',
            description: 'The key used to identify this state, passed to the useStateTogether hook',
          },
          {
            name: <RemovedPropSpan text='value' />,
            description: 'Removed, since this value will be controlled by the useStateTogether hook',
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage
      name='CalendarTogether'
      originalName='Calendar'
      docUrl={`https://primereact.org/calendartogether/`}
      ComponentDemo={PrimeReactCalendarTogetherDemo}
      api={api}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('CalendarTogether')} keyToLookupWith='' />
}
