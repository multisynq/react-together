import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Link({ to, className, children, ...props }: RouterLinkProps) {
  return (
    <RouterLink to={to} className='text-blue-600 rounded-sm bg-slate-100 px-1' {...props}>
      {children}
    </RouterLink>
  )
}
