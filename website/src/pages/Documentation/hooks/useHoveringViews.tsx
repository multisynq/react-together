import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { PresenceDiv } from '../../../../../react-together'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

function getDarkerShade(hexColor: string): string {
  // Remove the hash if it's there
  const hex = hexColor.replace(/^#/, '')

  // Parse the hex color
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // Darken each component by 20%
  const darkenFactor = 0.8
  const newR = Math.floor(r * darkenFactor)
  const newG = Math.floor(g * darkenFactor)
  const newB = Math.floor(b * darkenFactor)

  // Convert back to hex
  const newHex = ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0')

  return `#${newHex}`
}

interface UseHoveringViewsDemoProps {
  height?: number
  rgb?: string
  rtidSuffix?: string
}
function UseHoveringViewsDemo({ height = 3, rtidSuffix = '', rgb = '#fff58c' }: UseHoveringViewsDemoProps) {
  const rtid = 'useHoveringVeiwsDemo-' + rtidSuffix === '' ? 'root' : rtidSuffix

  const childRgb = getDarkerShade(rgb)
  return (
    <PresenceDiv rtid={rtid}>
      <div className={`min-w-5 min-h-5 border border-black rounded grid grid-cols-2 gap-2 p-2 `} style={{ backgroundColor: rgb }}>
        {height > 1 && (
          <>
            <UseHoveringViewsDemo height={height - 1} rtidSuffix={`${rtidSuffix}a`} rgb={childRgb} />
            <UseHoveringViewsDemo height={height - 1} rtidSuffix={`${rtidSuffix}b`} rgb={childRgb} />
            <UseHoveringViewsDemo height={height - 1} rtidSuffix={`${rtidSuffix}c`} rgb={childRgb} />
            {/* <UseHoveringViewsDemo height={height - 1} rtidSuffix={`${rtidSuffix}d`} rgb={childRgb} /> */}
          </>
        )}
      </div>
    </PresenceDiv>
  )
}

export default function UseHoveringViewsDocumentationPage() {
  const api = (
    <>
      <HookParamsApi
        items={[
          {
            name: 'rtid',
            type: 'string',
            description: 'The key used to identify this state',
          },
          // {
          //   name: 'options',
          //   type: 'UseHoveringViewOptions',
          //   description: 'An options object used to configure the behavior of this hook',
          // },
        ]}
      />
      <HookReturnApi
        items={[
          {
            name: '0',
            type: 'MutableRefObject',
            description: 'The current local state.',
          },
          {
            name: '1',
            type: 'string[]',
            description: 'An array containing all the viewIds that are currently hovering the element with the returned ref.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useHoveringViews'
      parameter='(rtid, options)'
      description={
        <>
          <p>
            The useHoveringViews hook is used to tell which views are hovering a given DOM element. If a view is hovering a component that
            is nested on other “hoverable” components, only the innermost will tell that view is hovering it.
          </p>
          <DocumentationDemo>
            <UseHoveringViewsDemo />
          </DocumentationDemo>
        </>
      }
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useHoveringViews } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            code1={`const [ref, hoveringViews] = useHoveringViews(‘hovering-views’)

return (
  <div>
    <div ref={ref}>Hover me!</div>
    <h3>Hovering Ids:</h3>
    <ul>
      {hoveringViews.map((viewId) => (
        <li key={viewId}>{viewId}</li>
      )}
    </ul>
  </div>
)`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useHoveringViews')} />
}
