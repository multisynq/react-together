import { ReactModel } from '@multisynq/react'
import { ChatMessage } from '../components/Chat'

interface SendMessageArgs {
  message: string
  senderId: string
  sentAt: number
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

    this.subscribe(rtKey, 'sendMessage', this.handleNewMessage)
  }

  // Explicitly destructuring object to ensure
  // message objects only contain the right properties
  handleNewMessage({ sentAt, senderId, message }: SendMessageArgs) {
    const msg = {
      id: this.nextMessageId++,
      sentAt,
      senderId,
      message
    }
    this.messages.push(msg)
    this.publish(this.rtKey, 'messageSent', msg)
  }
}
ChatModel.register('ChatModel')
