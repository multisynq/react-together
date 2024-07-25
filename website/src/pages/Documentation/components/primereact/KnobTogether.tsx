import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { KnobTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'
const name = 'KnobTogether'
const originalName = 'Knob'
const docUrl = `https://primereact.org/knob`

function PrimeReactKnobTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <KnobTogether rtid='knob-doc-demo' />
    </div>
  )
}

export default function PrimeReactKnobTogetherDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <WrappedComponentPropsTable
        items={[
          {
            removed: false,
            name: 'rtid',
            type: 'string',
            description: 'The key used to identify this state, passed to the useStateTogether hook',
          },
          {
            removed: true,
            name: 'value',
            description: 'Removed, since this value will be controlled by the useStateTogether hook',
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactKnobTogetherDemo} />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('KnobTogether')} keyToLookupWith='' />
}
