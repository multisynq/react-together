import { ChatExpandedProps } from './types'

export default function ChatExpanded({
  HeaderComponent,
  MessageComponent,
  InputComponent,
  messages,
  collapseChat,
  chatName,
  onSend,
  MessagesContainerComponent,
  MessageBodyComponent,
  AvatarComponent
}: ChatExpandedProps) {
  return (
    <div className="rt-chatContainer">
      <HeaderComponent
        chatName={chatName}
        collapseChat={() => collapseChat()}
      />
      <MessagesContainerComponent
        messages={messages}
        {...{
          MessageBodyComponent,
          MessageComponent,
          AvatarComponent
        }}
      />
      <InputComponent onSend={onSend} />
    </div>
  )
}
