import * as elements from "typed-html";
import {ChatRoom} from "../types";

export const AvailableChatroom = ({chatroom}: {chatroom: ChatRoom}) => {
    return (
        <div
            id={`${chatroom.name}`}
        >
            <button class="bg-sky-500" hx-get={`/chatroom/${chatroom.name}`} hx-target="#chat-room" hx-swap="innerHTML">{chatroom.name}</button>
        </div>
    )
}
