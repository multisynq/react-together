import { ReactModel } from '@croquet/react'
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

  handleNewMessage({ message, senderId, sentAt }: SendMessageArgs) {
    const msg = {
      message,
      senderId,
      sentAt,
      id: this.nextMessageId++
    }
    this.messages.push(msg)
    this.publish(this.rtKey, 'messageSent', msg)
  }
}
ChatModel.register('ChatModel')
