import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { AntDesignComponentDocumentationPage } from './AntDesignComponentDocumentationPage'

const name = 'DatePickerTogether'
const originalName = 'DatePicker'

const codes = {
  demo: {
    basic: `
import { DatePickerTogether } from '@multisynq/react-together-ant-design'

export function AntDesignDatePickerTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <DatePickerTogether 
        rtKey='date-picker-doc-demo' 
        format="YYYY/MM/DD"
      />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { DatePicker, DatePickerProps } from 'antd'
import { Dayjs } from 'dayjs'
import { useStateTogether } from '@multisynq/react-together'

export interface CalendarTogetherProps
  extends Omit<DatePickerProps, 'value' | 'onChange'> {
  rtKey: string
}

export default function DatePickerTogether({
  rtKey,
  ...props
}: CalendarTogetherProps) {
  const [value, set_value] = useStateTogether<Dayjs | undefined>(rtKey, undefined)
  return <DatePicker {...props} value={value} onChange={(e) => set_value(e)} />
}
`,
  },
}

export function AntDesignDatePickerTogetherDocumentationPage() {
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
            name: 'checked',
            description: (
              <p>
                Removed, as this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <AntDesignComponentDocumentationPage
      {...{
        name,
        originalName,
        api,
        demo: { code: codes.demo },
        source: { code: codes.source },
      }}
    />
  )

  return <DocumentationPage {...{ content, navItems: GenericDocNav('DatePickerTogether') }} />
}
