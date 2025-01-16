import { useCursors } from '../../hooks'
import { UseCursorsOptions } from '../../hooks/useCursors'
import './Cursors.css'
import UserCursor, { UserCursorOptions, UserCursorProps } from './UserCursor'

interface CursorsComponents {
  UserCursor?: (props: UserCursorProps) => React.ReactNode
}

interface CursorsProps extends UserCursorOptions {
  useCursorsOptions?: UseCursorsOptions
  components?: CursorsComponents
}

export default function Cursors(options: CursorsProps = {}) {
  const { useCursorsOptions, components } = options

  const { allCursors } = useCursors(useCursorsOptions)

  const UserCursorComponent = components?.UserCursor ?? UserCursor

  return (
    <div className="cursors-container">
      {Object.entries(allCursors).map(
        ([userId, cursor]) =>
          cursor && (
            <UserCursorComponent key={userId} userId={userId} {...cursor} />
          )
      )}
    </div>
  )
}
