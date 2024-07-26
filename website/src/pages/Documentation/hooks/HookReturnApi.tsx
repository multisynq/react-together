import CodeSpan from '@components/ui/CodeSpan'
import { TableContainer } from '@components/ui/TableContainer'
interface PropObject {
  name: string
  type: string | React.ReactNode
  description?: string | React.ReactNode
  default?: string | React.ReactNode
}
interface HookReturnApiProps {
  items: PropObject[]
}
export default function HookReturnApi({ items }: HookReturnApiProps) {
  return (
    <>
      <h5>Return</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'description', label: 'Description' },
        ]}
        data={items.map(({ name, type, ...fields }) => ({
          name: <CodeSpan text={name} />,
          type: typeof type === 'string' ? <CodeSpan text={type} /> : type,
          ...fields,
        }))}
      />
    </>
  )
}
