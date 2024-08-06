import CodeSpan from '@components/ui/CodeSpan'
import { TableContainer } from '@components/ui/TableContainer'
interface PropObject {
  name: string
  type: string | React.ReactNode
  description?: string | React.ReactNode
  default?: string | React.ReactNode
}
interface ComponentPropsTableProps {
  items: PropObject[]
}
export default function ComponentPropsTable({ items }: ComponentPropsTableProps) {
  return (
    <TableContainer
      keys={[
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'default', label: 'Default Value' },
        { key: 'description', label: 'Description' },
      ]}
      data={items.map(({ name, type, ...fields }) => ({
        name: <CodeSpan text={name} />,
        type: typeof type === 'string' ? <CodeSpan text={type} /> : type,
        ...fields,
      }))}
    />
  )
}
