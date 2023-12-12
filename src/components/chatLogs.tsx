import * as elements from "typed-html"
import { ChatMessage } from "./chatMessage"

export const ChatLogs = ({messages}: {messages: {content: string}[]}) => {
  if (!messages || messages.length === 0) {
    messages = []
  }
  return (
    <div id="chat-logs">
      {messages.map((message) => <ChatMessage message={message.content}/>)}
    </div>
  )
}
