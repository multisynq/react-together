import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'RatingTogether'
const originalName = 'Rating'

const codes = {
  demo: {
    basic: `
import { RatingTogether } from 'react-together-primereact'

export function PrimeReactRatingTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <RatingTogether rtKey='rating-doc-demo' />
    </div>
  )
}
`,
  },

  source: {
    basic: `
import { Rating, RatingProps } from 'primereact/rating'
import { Nullable } from 'primereact/ts-helpers'
import { useStateTogether } from '@multisynq/react-together'

export default function RatingTogether({ rtKey, ...props }) {
}: RatingTogetherProps) {
  const [value, set_value] = useStateTogether<Nullable<number>>(rtKey, null)
  return (
    <Rating
      {...props}
      value={value || undefined}
      onChange={(e) => set_value(e.value)}
    />
  )
}
`,
  },
}

export default function PrimeReactRatingTogetherDocumentationPage() {
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
          {
            removed: true,
            name: 'readOnly',
            description: 'Synchronized components should not be read-only.',
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage
      {...{
        name,
        originalName,
        api,
        demo: { code: codes.demo },
        source: { code: codes.source },
      }}
    />
  )

  return <DocumentationPage {...{ content, navItems: GenericDocNav('RatingTogether') }} />
}
