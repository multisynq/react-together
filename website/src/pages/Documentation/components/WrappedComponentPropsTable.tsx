import NewPropSpan from '@components/ui/NewPropSpan'
import RemovedPropSpan from '@components/ui/RemovedPropSpan'
import { TableContainer } from '@components/ui/TableContainer'
interface PropObject {
  removed: boolean
  name: string
  type?: string
  description?: string
  default?: string
}
interface WrappedComponentPropsTableProps {
  items: PropObject[]
}
export default function WrappedComponentPropsTable({ items }: WrappedComponentPropsTableProps) {
  return (
    <TableContainer
      keys={[
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'default', label: 'Default Value' },
        { key: 'description', label: 'Description' },
      ]}
      data={items.map(({ name, removed, ...fields }) => ({
        name: removed ? <RemovedPropSpan text={name} /> : <NewPropSpan text={name} />,
        ...fields,
      }))}
    />
  )
}
