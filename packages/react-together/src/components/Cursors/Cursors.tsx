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
      <UserCursorComponent
        userId="afonsocrg"
        percentX={0.7}
        pageY={550}
        // Don't care
        pageX={100}
        percentY={0.5}
        clientX={100}
        clientY={100}
      />
    </div>
  )
}
