import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DropdownTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'DropdownTogether'
const originalName = 'Dropdown'
const docUrl = `https://primereact.org/dropdown`

function PrimeReactDropdownTogetherDemo() {
  const cities = [
    { name: 'Los Angeles', code: 'LA' },
    { name: 'London', code: 'LDN' },
    { name: 'Lisbon', code: 'LIS' },
  ]
  return (
    <div className='flex-col place-items-center'>
      <DropdownTogether
        rtid='dropdown-doc-demo'
        options={cities}
        optionLabel='name'
        placeholder='Select a City'
        className='w-full md:w-14rem'
      />
    </div>
  )
}

export default function PrimeReactDropdownTogetherDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <WrappedComponentPropsTable
        items={[
          {
            removed: false,
            name: 'rtid',
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
                Removed, since this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactDropdownTogetherDemo} />
  )

  return <DocumentationPage content={content} navItems={GenericDocNav('DropdownTogether')} />
}
