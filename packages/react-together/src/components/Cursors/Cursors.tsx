import { useCursors } from '../../hooks'
import { UseCursorsOptions } from '../../hooks/useCursors'
import './Cursors.css'
import _UserCursor, { UserCursorOptions, UserCursorProps } from './UserCursor'

interface CursorsComponents {
  UserCursor?: (props: UserCursorProps) => React.ReactNode
}

interface CursorsProps extends UserCursorOptions, UseCursorsOptions {
  components?: CursorsComponents
}

export default function Cursors({
  // useCursorsOptions
  omitMyValue,
  deleteOnLeave,
  throttleDelay,
  // UserCursorOptions
  transitionDuration,
  getUserColor,
  // CursorsComponents
  components
}: CursorsProps = {}) {
  const { allCursors } = useCursors({
    omitMyValue,
    deleteOnLeave,
    throttleDelay
  })

  const UserCursor = components?.UserCursor ?? _UserCursor

  return (
    <div className="cursors-container">
      {Object.entries(allCursors).map(
        ([userId, cursor]) =>
          cursor && (
            <UserCursor
              key={userId}
              userId={userId}
              {...cursor}
              {...{ transitionDuration, getUserColor }}
            />
          )
      )}
    </div>
  )
}
