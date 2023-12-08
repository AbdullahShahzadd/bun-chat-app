import * as elements from "typed-html";
import { AvailableChatroom } from "./availableChatroom";
import { CreateChatroom } from "./createChatroom";
import {ChatRoom} from "../types";

export const AvailableChatrooms = ({chatrooms}: {chatrooms: ChatRoom[]}) => {
    if (!chatrooms || chatrooms.length === 0) {
        chatrooms = []
    }
    return (
        <div
        hx-ext="ws"
        ws-connect="/ws"
        >
        <h1>Available Chatrooms</h1>
            <div id="available-chatrooms">
            {chatrooms.map((chatroom) => <AvailableChatroom chatroom={chatroom}/>)}
            </div>
            <CreateChatroom error={false}/>
            <div id="chat-room"></div>
        </div>
    )
}