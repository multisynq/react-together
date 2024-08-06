import CodeSpan from '@components/ui/CodeSpan'
import NewPropSpan from '@components/ui/NewPropSpan'
import RemovedPropSpan from '@components/ui/RemovedPropSpan'
import { TableContainer } from '@components/ui/TableContainer'
interface PropObject {
  removed: boolean
  name: string
  type?: string | React.ReactNode
  description?: string | React.ReactNode
  default?: string | React.ReactNode
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
      data={items.map(({ name, type, removed, ...fields }) => ({
        name: removed ? <RemovedPropSpan text={name} /> : <NewPropSpan text={name} />,
        type: typeof type === 'string' ? <CodeSpan text={type} /> : type,
        ...fields,
      }))}
    />
  )
}
