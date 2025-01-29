import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../../GenericDocPage'
import { PreviewSourceCodeTabs } from '../../PreviewSourceCodeTabs'
import ComponentPropsTable from '../ComponentPropsTable'

export const codes = {
  demo: {
    typescript: `
import { useState } from 'react'
import { HoverHighlighter } from 'react-together'

interface HoverHighlighterRecursiveProps {
  height: number
  color?: string
  rtidSuffix?: string
}
export function HoverHighlighterDemoRecursive({ height, color = '66cdf2', rtidSuffix = '' }: HoverHighlighterRecursiveProps) {
  const rtKey = 'useHoveringUsersDemo-' + rtidSuffix === '' ? 'root' : rtidSuffix
  const childRgb = getDarkerShade(color, 0.85)
  return (
    <HoverHighlighter rtKey={rtKey}>
      <div className={\`min-w-5 min-h-5 border border-black rounded grid grid-cols-2 gap-2 p-2 \${className}\`} style={{ backgroundColor: color }}>
        {height > 1 && (
          <>
            <HoverHighlighterDemoRecursive height={height - 1} rtidSuffix={\`\${rtidSuffix}a\`} color={childRgb} />
            <HoverHighlighterDemoRecursive height={height - 1} rtidSuffix={\`\${rtidSuffix}b\`} color={childRgb} />
            <HoverHighlighterDemoRecursive height={height - 1} rtidSuffix={\`\${rtidSuffix}c\`} color={childRgb} />
          </>
        )}
      </div>
    </HoverHighlighter>
  )
}

export function HoverHighlighterDemo() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [color, setColor] = useState('66cdf2')

  return <HoverHighlighterDemoRecursive height={3} color={\`#\${color}\`} />
}

function getDarkerShade(hexColor: string, darkenFactor = 0.8): string {
  // Remove the hash if it's there
  const hex = hexColor.replace(/^#/, '')

  // Parse the hex color
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // Darken each component
  const newR = Math.floor(r * darkenFactor)
  const newG = Math.floor(g * darkenFactor)
  const newB = Math.floor(b * darkenFactor)

  // Convert back to hex
  const newHex = ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0')

  return \`#\${newHex}\`
}
`,
  },

  usage_1: {
    basic: `import { ReactTogether } from 'react-together`,
  },

  usage_2: {
    basic: `
return (
  <HoverHighlighter rtKey='unique-key'>
    <YourComponent/>
  </HoverHighlighter>
)
`,
  },

  source: {
    basic: `
import { useViewId } from '@croquet/react'
import ColorHash from 'color-hash'
import { useHoveringUsers } from '../hooks'

const colorHash = new ColorHash()

export default function HoverHighlighter({ rtKey, children, className, highlightMyself = false }) {
  const [ref, hoveringUsers, isHovering] = useHoveringUsers(rtKey)
  const myId = useViewId()

  let style = {}
  const users = highlightMyself
    ? hoveringUsers
    : hoveringUsers.filter((v) => v !== myId)
  if (users.length > 0 || (highlightMyself && isHovering)) {
    const color = colorHash.hex(users[0] ?? rtKey)
    style = {
      outline: \`2px solid \${color}\`,
      animation: 'clippath 3s linear infinite',
      borderRadius: '10px'
    }
  }

  return (
    <>
      <div ref={ref} style={style} {...{ className }}>
        {children}
      </div>
    </>
  )
}
`,
  },
}

export default function HoverHighlighterDocumentationPage() {
  const api = (
    <>
      <h5>Props</h5>
      <ComponentPropsTable
        items={[
          {
            name: 'rtKey',
            type: 'string',
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useHoveringUsers' text='useHoveringUsers' /> hook.
              </p>
            ),
          },
          {
            name: 'children',
            type: 'ReactNode',
            description: (
              <p>
                The content to be rendered inside this <CodeSpan text='div' />.
              </p>
            ),
          },
          {
            name: 'highlightMyself',
            type: 'boolean',
            default: <CodeSpan text='false' />,
            description: <p>If true, the nested component will be highlighted when the local user hovers it.</p>,
          },
          {
            name: 'className',
            type: 'string',
            description: (
              <p>
                The <CodeSpan text='className' /> to be passed to the containing <CodeSpan text='div' />, used to customize its appearance.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'HoverHighlighter',
        description: (
          <>
            <p>
              This component wraps its children inside a <CodeSpan text='div' /> that is highlighted whenever a user is hovering it. This
              component can be customized by passing a <CodeSpan text='className' /> prop. Alternatively, you can create your own component
              using the <LinkSpan to='/useHoveringUsers' text='useHoveringUsers' /> hook.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='HoverHighlighter' />,
                code: <CodeBlock {...{ code: codes.demo, github: getDocLinks({ rt_name: 'HoverHighlighter' }).github_demo }} />,
              }}
            />
          </>
        ),
        usage: (
          <>
            <CodeBlock {...{ code: codes.usage_1 }} />
            <CodeBlock {...{ code: codes.usage_2 }} />
          </>
        ),
        api,
        source: (
          <CodeBlock {...{ code: codes.source, github: getDocLinks({ rt_path: 'components/HoverHighlighter.tsx' }).github_source }} />
        ),
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('HoverHighlighter') }} />
}
