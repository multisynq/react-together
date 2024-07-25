import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { RatingTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'RatingTogether'
const originalName = 'Rating'
const docUrl = `https://primereact.org/rating`

function PrimeReactRatingTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <RatingTogether rtid='rating-doc-demo' />
    </div>
  )
}

export default function PrimeReactRatingTogetherDocumentationPage() {
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
          {
            removed: true,
            name: 'readOnly',
            description: 'Synchronized components should not be read only',
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactRatingTogetherDemo} />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('RatingTogether')} />
}
