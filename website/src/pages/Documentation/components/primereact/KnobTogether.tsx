import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { KnobTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactKnobTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      {/* <KnobTogether rtid='input-switch-doc-demo' /> */}
      Demo
    </div>
  )
}

export default function PrimeReactKnobTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='KnobTogether'
      originalName='Knob'
      docUrl={`https://primereact.org/knobtogether/`}
      ComponentDemo={PrimeReactKnobTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('KnobTogether')} keyToLookupWith='' />
}
