import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { RatingTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

function PrimeReactRatingTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      {/* <RatingTogether rtid='input-switch-doc-demo' /> */}
      Demo
    </div>
  )
}

export default function PrimeReactRatingTogetherDocumentationPage() {
  const content = (
    <PrimeReactComponentDocumentationPage
      name='RatingTogether'
      originalName='Rating'
      docUrl={`https://primereact.org/ratingtogether/`}
      ComponentDemo={PrimeReactRatingTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('RatingTogether')} keyToLookupWith='' />
}
