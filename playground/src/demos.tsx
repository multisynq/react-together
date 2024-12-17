import AntDemos from './antDemos'
import Chat from './chat'
import CountPerUserDemo from './countPerUser'
import Gallery from './gallery'
import SessionDemo from './sessionDemo'
import TinyRpg from './tinyRpg'

export interface Demo {
  path: string
  label: string
  description?: string
  element: React.ReactNode
}
export const demos: Demo[] = [
  {
    label: 'Gallery',
    path: 'gallery',
    element: <Gallery />,
    description: 'A simple gallery of React Together components'
  },
  {
    label: 'Tiny RPG',
    path: 'rpg',
    element: <TinyRpg />,
    description:
      'A beautiful game where you have to catch some coins before other players'
  },
  {
    label: 'Chat',
    path: 'chat',
    element: <Chat />,
    description: 'A simple IRC based on useFunctionTogether.'
  },
  {
    label: 'Session',
    path: 'session',
    element: <SessionDemo />,
    description: 'A simple session demo using useSessionTogether.'
  },
  {
    label: 'Count Per User',
    path: 'countPerUser',
    element: <CountPerUserDemo />,
    description:
      'A simple count per user demo using useStateTogetherWithPerUserValues.'
  },
  {
    label: 'Ant Demos',
    path: 'antDemos',
    element: <AntDemos />,
    description: 'A simple ant demos demo using antNewMqPackage.'
  }
]
