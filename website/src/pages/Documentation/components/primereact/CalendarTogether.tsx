import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'CalendarTogether'
const originalName = 'Calendar'
const docUrl = `https://primereact.org/calendar`

const sourceCode = `
import { Calendar, CalendarProps } from 'primereact/calendar'
import { useStateTogether } from 'react-together'

export interface CalendarTogetherProps
  extends Omit<CalendarProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function CalendarTogether({
  rtKey,
  ...props
}: CalendarTogetherProps) {
  const [value, setChecked] = useStateTogether(rtKey, null)

  return (
    <Calendar
      {...props}
      onChange={(e) =>
        setChecked(
          e.value === null || e.value === undefined
            ? null
            : e.value.toISOString()
        )
      }
      value={value === null ? value : new Date(value)}
      selectionMode="single"
    />
  )
}
`

export default function PrimeReactCalendarTogetherDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <WrappedComponentPropsTable
        items={[
          {
            removed: false,
            name: 'rtKey',
            type: 'string',
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
          {
            removed: true,
            name: 'value',
            description: (
              <p>
                Removed, as this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api, sourceCode, demoCode: '' }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('CalendarTogether')} />
}
