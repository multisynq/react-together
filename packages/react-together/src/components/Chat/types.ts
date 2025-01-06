import { ChatMessage } from '../../models/ChatModel'

export type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML

export interface ChatCollapsedProps {
  chatName: string | React.ReactElement
  expandChat: () => void
}

export interface ChatHeaderProps {
  chatName: string | React.ReactElement
  collapseChat: () => void
}

export interface ChatInputProps {
  onSend: (message: string) => void
}

export interface MessageProps {
  message: string
  sender: string
  timestamp: number
  isMe: boolean
}

export interface MessagesContainerProps {
  messages: ChatMessage[]
  MessageComponent: Component<MessageProps>
}

export interface ChatExpandedProps
  extends ChatHeaderProps,
    ChatInputProps,
    MessagesContainerProps {
  HeaderComponent: Component<ChatHeaderProps>
  MessageComponent: Component<MessageProps>
  MessagesContainerComponent: Component<MessagesContainerProps>
  InputComponent: Component<ChatInputProps>
}

export interface ChatComponents {
  header?: Component<ChatHeaderProps>
  collapsed?: Component<ChatCollapsedProps>
  message?: Component<MessageProps>
  input?: Component<ChatInputProps>
  expanded?: Component<ChatExpandedProps>
  messagesContainer?: Component<MessagesContainerProps>
}

export interface ChatProps {
  chatName?: string | React.ReactElement
  components?: ChatComponents
}
