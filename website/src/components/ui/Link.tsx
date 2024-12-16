import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

export default function Link({ to, className, children, ...props }: RouterLinkProps) {
  return (
    <RouterLink to={to} className={`text-blue-600 rounded-sm bg-gray-100 px-1 ${className}`} {...props}>
      {children}
    </RouterLink>
  )
}
