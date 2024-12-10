import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const demoCode = `
import bellAudio from '@assets/tuningFork440Hz.mp3'
import { useCallback, useState } from 'react'
import { useFunctionTogether } from 'react-together'

// Create audio context outside component to persist between renders
const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const audio = new Audio(bellAudio)

// Create a gain node to control audio volume
const gainNode = audioContext.createGain()
const source = audioContext.createMediaElementSource(audio)
source.connect(gainNode)
gainNode.connect(audioContext.destination)

const FADE_AFTER = 2
const FADE_DURATION = 6

export function MeditationBell() {
  const [isRinging, setIsRinging] = useState(false)

  const ringBell = useFunctionTogether(
    'meditation-bell',
    useCallback(() => {
      if (isRinging) return

      // Schedule the fade out
      const defaultVolume = 0.03
      gainNode.gain.cancelScheduledValues(audioContext.currentTime)
      gainNode.gain.setValueAtTime(defaultVolume, audioContext.currentTime)
      gainNode.gain.setValueAtTime(defaultVolume, audioContext.currentTime + FADE_AFTER)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + FADE_AFTER + FADE_DURATION)

      // Play the bell sound
      audioContext.resume().then(() => {
        audio.currentTime = 0
        audio.play().catch(() => {
          // Sound failed to play - that's okay, we have visual feedback
        })
      })

      // Start animations
      setIsRinging(true)

      // Reset animations and audio
      setTimeout(
        () => {
          setIsRinging(false)
          audio.pause()
          audio.currentTime = 0
        },
        1000 * (FADE_AFTER + FADE_DURATION)
      )
    }, [isRinging, setIsRinging])
  )

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-slate-100'>
      <div className='relative'>
        {/* Bell icon with bounce animation */}
        <button
          onClick={() => ringBell()}
          className={\`text-6xl transition-transform \${isRinging ? 'scale-110 cursor-not-allowed' : 'scale-100 cursor-pointer'} hover:scale-105\`}
          aria-label='Ring meditation bell'
        >
          🔔
        </button>

        {/* Visual "Dong..." text that appears and fades */}
        {isRinging && (
          <div className='absolute -right-24 top-0'>
            <span className='text-2xl text-gray-600 italic'>Ding...</span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className='absolute bottom-8 text-gray-500'>Click the bell to ring it</div>
    </div>
  )
}
`

const description = (
  <>
    <p>
      The <CodeSpan text='useFunctionTogether' /> hook allows all users to execute the same function simultaneously, using the same
      arguments. Whenever any user calls the function returned by the hook, all users that are rendering this hook with the same{' '}
      <CodeSpan text='rtKey' /> will execute their local version of the function.
    </p>
    <p>
      Keep in mind that only the function arguments are guaranteed to be the same across every user. If the given function captures local
      variables, those may differ from user to user! If you want a perfectly synchronized state, with stronger guarantees, we invite you to
      take a look at the underlying library:{' '}
      <LinkSpan text='@croquet/react' to='https://www.npmjs.com/package/@croquet/react' target='_blank' /> 😉.
    </p>
    <PreviewSourceCodeTabs preview={<DocumentationDemo url='useFunctionTogether' />} code={<CodeBlock language='tsx' code1={demoCode} />} />
  </>
)

export default function UseFunctionTogetherDocumentationPage() {
  const api = (
    <>
      <HookParamsApi
        items={[
          {
            name: 'rtKey',
            type: 'string',
            description: 'The key used to identify this function.',
          },
          {
            name: 'fn',
            type: 'T extends (...args any[]) => any',
            description: 'The function to be synchronized',
          },
        ]}
      />
      <HookReturnApi
        items={[
          {
            name: 'synqFn',
            type: 'T',
            description: (
              <>
                The synchronized function. Whenever someone calls this function, everyone else executes it at the same time, with the same
                arguments.
              </>
            ),
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      title='useFunctionTogether'
      description={description}
      usage={
        <>
          <CodeBlock language='jsx' codeShort={`import { useLeaveSession } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            codeShort={`\
export default function YourComponent() {
  const ding = useFunctionTogether('ding', () => {
    alert('Dong!')
  })

  return (
    <button onClick={() => ding()}>
      Ring the bell!
    </button>
  )
}
`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useFunctionTogether')} />
}
