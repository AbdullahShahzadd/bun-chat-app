import * as elements from "typed-html"
import {ChatLogs} from "./chatLogs";
import {ChatSubmit} from "./chatSubmit";
import {ChatRoom} from "../types";

export const ChatRoom = ({chatLogs, chatRoom}: {chatLogs: string[], chatRoom: ChatRoom}) => {
  return (
          <div
              id="chat-room"
                hx-ext="ws"
                ws-connect={`/chatroom/${chatRoom.id}`}
          >
              <h1>{chatRoom.name}</h1>
              <ChatLogs messages={chatLogs}/>
              <ChatSubmit chatRoom="chatRoom"/>
          </div>
  )
}