import { Link } from 'react-router-dom'
import { Demo } from '../demos'

interface DemoCardProps extends Demo {}
export function DemoCard({ label, description, path }: DemoCardProps) {
  return (
    <Link to={path}>
      <div className="bg-blue-200 hover:bg-blue-300 cursor-pointer p-4 rounded-md w-64 h-full break-words">
        <h3 className="font-bold">{label}</h3>
        {description && <p>{description}</p>}
      </div>
    </Link>
  )
}
