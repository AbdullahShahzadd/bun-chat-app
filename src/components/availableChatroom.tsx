import * as elements from "typed-html";
import {ChatRoom} from "../types";

export const AvailableChatroom = ({chatroom}: {chatroom: ChatRoom}) => {
    return (
        <div
            id={`${chatroom.id}`}
        >
            <button hx-get={`/chatroom/${chatroom.id}`} hx-target="#chat-room" hx-swap="innerHTML">{chatroom.name}</button>
        </div>
    )
}