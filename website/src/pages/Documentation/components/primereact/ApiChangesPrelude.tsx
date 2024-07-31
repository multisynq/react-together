import Link from '@components/ui/Link'
interface ApiChangesPreludeProps {
  docUrl: string
}
export default function ApiChangesPrelude({ docUrl }: ApiChangesPreludeProps) {
  return (
    <p>
      Below we document the changes made to the original component's API. For a detailed specification please refer to the component's{' '}
      <Link to={docUrl} target='_blank'>
        documentation page.
      </Link>
    </p>
  )
}
