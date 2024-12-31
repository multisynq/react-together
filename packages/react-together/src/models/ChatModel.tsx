import { ReactModel } from '@croquet/react'

export interface ChatMessage {
  id: number
  senderId: string
  message: string
  sentAt: number
}

interface SendMessageArgs {
  message: string
  senderId: string
}

export default class ChatModel extends ReactModel {
  rtKey: string
  messages: ChatMessage[]
  nextMessageId: number

  init({ rtKey }: { rtKey: string }) {
    super.init({})

    this.rtKey = rtKey
    this.messages = []
    this.nextMessageId = 0

    this.subscribe(rtKey, 'sendMessage', this.sendMessage)
  }

  sendMessage({ message, senderId }: SendMessageArgs) {
    this.messages.push({
      message,
      senderId,
      sentAt: Date.now(),
      id: this.nextMessageId++
    })
    this.publish(this.rtKey, 'messageSent', {})
  }
}
ChatModel.register('ChatModel')
