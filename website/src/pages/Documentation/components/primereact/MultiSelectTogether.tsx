import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'MultiSelectTogether'
const originalName = 'MultiSelect'
const docUrl = `https://primereact.org/multiselect`

const sourceCode = `
import { MultiSelect, MultiSelectProps } from 'primereact/multiselect'
import { useStateTogether } from 'react-together'

export default function MultiSelectTogether({ rtKey, ...props }) {
  const [value, set_value] = useStateTogether(rtKey, [])
  return (
    <MultiSelect
      {...props}
      value={value}
      onChange={(e) => set_value(e.value)}
    />
  )
}
`

const demoCode = `
import { MultiSelectTogether } from 'react-together-primereact'

export function PrimeReactMultiSelectTogetherDemo() {
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]
  return (
    <div className='flex-col place-items-center'>
      <MultiSelectTogether rtKey='multi-select-doc-demo' options={cities} optionLabel='name' multiple display='chip' />
    </div>
  )
}
`

export default function PrimeReactMultiSelectTogetherDocumentationPage() {
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
                The key used to identify this state, passed to the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
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
  const content = <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api, sourceCode, demoCode }} />

  return <DocumentationPage content={content} navItems={GenericDocNav('MultiSelectTogether')} />
}
