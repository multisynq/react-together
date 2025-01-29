import { useCroquetContext, usePublish } from '@croquet/react'
import { useCallback, useEffect, useState } from 'react'
import { ChatMessage } from '../components/Chat'
import ReactTogetherModel, { getChat } from '../models/ReactTogetherModel'
import useMyId from './useMyId'

const EMPTY_ARRAY: ChatMessage[] = []

export default function useChat(rtKey: string) {
  const myId = useMyId()
  const { view, model } = useCroquetContext<ReactTogetherModel>()

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (!model) return EMPTY_ARRAY
    const chat = getChat(model, rtKey)
    if (!chat) {
      return EMPTY_ARRAY
    }
    return chat.messages
  })

  useEffect(() => {
    if (!model || !view) {
      setMessages(EMPTY_ARRAY)
      return
    }

    const chat = getChat(model, rtKey)
    if (!chat) {
      view.publish(model.id, 'createChat', { rtKey })
    }

    const handler = () => {
      const chat = getChat(model, rtKey)
      if (!chat) {
        // console.warn(`Chat ${rtKey} not found`)
        return
      }
      setMessages([...chat.messages])
    }

    handler()
    view.subscribe(rtKey, 'messageSent', handler)
    return () => view.unsubscribe(rtKey, 'messageSent', handler)
  }, [model, view, rtKey])

  const publishSendMessage = usePublish((data) => [rtKey, 'sendMessage', data])

  const sendMessage = useCallback(
    (message: string) => {
      if (message.trim() === '') return

      const now = Date.now()
      if (myId === null) {
        console.warn('Cannot send message outside of a session')
        return
      }

      publishSendMessage({
        message,
        senderId: myId,
        sentAt: now
      })
    },
    [publishSendMessage, myId]
  )

  return { messages, sendMessage }
}
