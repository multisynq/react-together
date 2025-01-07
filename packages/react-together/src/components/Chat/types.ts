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
  AvatarComponent: Component<AvatarProps>
  MessageBodyComponent: Component<MessageBodyProps>
}

export interface MessagesContainerProps {
  messages: ChatMessage[]
  MessageComponent: Component<MessageProps>
  AvatarComponent: Component<AvatarProps>
  MessageBodyComponent: Component<MessageBodyProps>
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
  avatar?: Component<AvatarProps>
  messageBody?: Component<MessageBodyProps>
}

export interface MessageBodyProps {
  isMe: boolean
  sender: string
  message: string
  timestamp: number
  formatTime?: (ts: number) => string
}

export interface AvatarProps {
  isMe: boolean
  sender: string
}

export interface ChatProps {
  rtKey: string
  chatName?: string | React.ReactElement
  components?: ChatComponents
  showWhenDisconnected?: boolean
}
