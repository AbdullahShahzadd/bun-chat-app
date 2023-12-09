import Elysia, {t} from "elysia";
import * as elements from "typed-html"
import { Base } from "./components/base"
import { html } from "@elysiajs/html"
import { StartChat } from "./components/startChat";
import { ChatRoom } from "./components/chatRoom";
import {createChatRoom, getAllChatRooms, getChatRoomById, getChatRoomLogs} from "./db/queries/chatRoom";
import { AvailableChatroom } from "./components/availableChatroom";
import {CreateChatroom} from "./components/createChatroom";
import {AvailableChatrooms} from "./components/availableChatrooms";
import {ChatMessage} from "./components/chatMessage";

const main = async () => {
    const some = new Elysia()
    const app = new Elysia()
        .use(html())
        .ws("/ws", {
            open(ws) {
                ws.subscribe("all")
            },
        })
        .ws("/chatroom/:chatroomId", {
            async message(ws, msg) {
                    const chatRoomId = parseInt(ws.data.params.chatroomId);
                    const chatRoom = await getChatRoomById(chatRoomId);
                    // save message to db
                console.log('chatRoom', chatRoom)
                console.log('msg', msg)
                ws.publish('chat1', `helloooooooooooooooooo`)
                app.server?.publish('chat1', 'hello')
                console.log('published')
                console.log('ws', ws)
                },
            async open(ws) {
                // TODO: close previous connections on same page
                // Looks like they close automatically after about 6 minutes.
                    const chatRoomId = parseInt(ws.data.params.chatroomId);
                    const chatRoom = await getChatRoomById(chatRoomId);
                    console.log('open chatRoom', chatRoom)
                    ws.subscribe(chatRoom.name)
                }
        })
        .get("/", async () => {
             return(<Base>
                    <StartChat/>
                </Base>)
            }
        )
        .post("/chat", async ({request, body}) =>
            {
                // Need to add validation here to make sure username is not empty
                // and that it is not already taken
                const chatRooms = await getAllChatRooms();
                return (
                    <AvailableChatrooms chatrooms={chatRooms}/>
                )
            }, {
            body: t.Object({
                username: t.String(),
            })
            }
        )
        .get("/chatroom/:chatroomId", async ({request, params}) => {
                        const chatRoomId = parseInt(params.chatroomId);
                        const chatRoom = await getChatRoomById(chatRoomId);
                        const chatRoomLogs = await getChatRoomLogs(chatRoomId);
                        return (<ChatRoom chatRoom={chatRoom} chatLogs={chatRoomLogs}/>)
        }, {
            params: t.Object({
                chatroomId: t.String(),
            })

        })
        .post("/chatroom",async ({request, body, set}) => {
            try {

                if (body.chatroom.trim().length === 0) {
                    return (<CreateChatroom error={true} errorMessage="Chatroom name cannot be empty"/>)
                }
                const dbChatRoom = await createChatRoom(body.chatroom)
                app.server?.publish("all", `<div id="available-chatrooms" hx-swap-oob="beforeend">${<AvailableChatroom
                    chatroom={dbChatRoom}/>}</div>`)
                return (<CreateChatroom error={false} errorMessage=""/>)
            } catch (e) {
                return (<CreateChatroom error={true} errorMessage={e.message}/>)
            }
        }, {
            body: t.Object({
                chatroom: t.String(),
            })
        })
        .listen(3000);

    console.log(
        `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );


}

main().catch(console.error);