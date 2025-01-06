import { ChatExpandedProps } from './types'

export default function ChatExpanded({
  HeaderComponent,
  MessageComponent,
  InputComponent,
  messages,
  collapseChat,
  chatName,
  onSend,
  MessagesContainerComponent
}: ChatExpandedProps) {
  return (
    <div className="rt-chatContainer">
      <HeaderComponent
        chatName={chatName}
        collapseChat={() => collapseChat()}
      />
      <MessagesContainerComponent
        messages={messages}
        MessageComponent={MessageComponent}
      />
      <InputComponent onSend={onSend} />
    </div>
  )
}
