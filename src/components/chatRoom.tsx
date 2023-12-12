import * as elements from "typed-html"
import {ChatLogs} from "./chatLogs";
import {ChatSubmit} from "./chatSubmit";
import {ChatRoom as ChatRoomType} from "../types";

export const ChatRoom = ({chatLogs, chatRoom}: {chatLogs: {content: string}[], chatRoom: ChatRoomType}) => {
  return (
          <div
              id="chat-room"
                hx-ext="ws"
                ws-connect={`/chatroom/${chatRoom.name}`}
          >
              <h1>{chatRoom.name}</h1>
              <ChatLogs messages={chatLogs}/>
              <ChatSubmit chatRoom="chatRoom"/>
          </div>
  )
}
