import Elysia, {t} from "elysia";
import * as elements from "typed-html"
import { Base } from "./components/base"
import { html } from "@elysiajs/html"
import { StartChat } from "./components/startChat";
import { ChatRoom } from "./components/chatRoom";
import {
    createChatRoom, 
    getAllChatRooms, 
    getChatRoom, 
    getChatRoomLogs,
    createOrReturnUser,
    saveMessage
} from "./db/queries/chatRoom";
import { AvailableChatroom } from "./components/availableChatroom";
import {CreateChatroom} from "./components/createChatroom";
import {AvailableChatrooms} from "./components/availableChatrooms";
import {ChatMessage} from "./components/chatMessage";

const main = async () => {
    const app = new Elysia()
    .use(html())
    .ws("/ws", {
        open(ws) {
            ws.subscribe("all")
        },
    })
    .ws("/chatroom/:chatroomName", {
        async message(ws, msg) {
            const chatRoom = await getChatRoom(ws.data.params.chatroomName);
            // save message to db

            await saveMessage(ws.data.cookie.username.value, ws.data.params.chatroomName, msg.message)
            app.server?.publish(chatRoom.name, `<div id="chat-logs" hx-swap-oob="beforeend">${
                <ChatMessage message={msg.message}/>
            }</div>`)
        },
        async open(ws) {
            // TODO: close previous connections on same page
            // Looks like they close automatically after about 6 minutes.
            console.log('/chatroom/:chatroomName ws: ', ws.data.cookie.username.value);
            const chatRoom = await getChatRoom(ws.data.params.chatroomName);
            ws.subscribe(chatRoom.name)
        }
    })
    .get("/", async () => {
        return(<Base>
               <StartChat/>
               </Base>)
    }
        )
        .post("/chat", async ({body, cookie: {username}}) =>

              {
                  // Need to add validation here to make sure username is not empty
                  // and that it is not already taken
                  const user = await createOrReturnUser(body.username);
                  username.value = user.username;
                  const chatRooms = await getAllChatRooms();
                  return (
                      <AvailableChatrooms chatrooms={chatRooms} user={user}/>
                  )
              }, {
                  body: t.Object({
                      username: t.String(),
                  })
              }
             )
             .get("/chatroom/:chatroomName", async ({params}) => {
                 const chatRoom = await getChatRoom(params.chatroomName);
                 const chatRoomLogs = await getChatRoomLogs(params.chatroomName);
                 return (<ChatRoom chatRoom={chatRoom} chatLogs={chatRoomLogs}/>)
             }, {
                 params: t.Object({
                     chatroomName: t.String(),
                 })

             })
             .post("/chatroom",async ({body}) => {
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
