import CodeSpan from '@components/ui/CodeSpan'
import { TableContainer } from '@components/ui/TableContainer'
interface PropObject {
  name: string
  type: string | React.ReactNode
  description?: string | React.ReactNode
  default?: string
  deprecated?: boolean
}
interface InterfaceApiProps {
  title: string
  id?: string
  items: PropObject[]
}
export default function InterfaceApi({ title, id = undefined, items }: InterfaceApiProps) {
  return (
    <>
      <h5 id={id}>{title}</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'default', label: 'Default value' },
          { key: 'description', label: 'Description' },
        ]}
        data={items.map(({ name, type, deprecated, ...fields }) => ({
          name: <CodeSpan text={name} className={deprecated ? 'line-through' : ''} />,
          type: typeof type === 'string' ? <CodeSpan text={type} /> : type,
          ...fields,
        }))}
      />
    </>
  )
}
