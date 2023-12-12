import {getClient} from "../index";
import {ChatRoom, User} from "../../types";
import {QueryResult} from "pg";

export const getChatRoom = async (name: string): Promise<ChatRoom> => {
    const client = await getClient();
    const result: QueryResult<ChatRoom> = await client.query(`
        SELECT *
        FROM chat_rooms cr
        WHERE cr.name = $1
    `, [name]);
    return result.rows[0];
}

export const getAllChatRooms = async (): Promise<ChatRoom[]> => {
    const client = await getClient();
    const result: QueryResult<ChatRoom> = await client.query(`
    SELECT *
    FROM chat_rooms;
    `);
    return result.rows;
}

export const createChatRoom = async (name: string): Promise<ChatRoom> => {
    const client = await getClient();
    const result: QueryResult<ChatRoom> = await client.query(`
        INSERT INTO chat_rooms (name)
        VALUES ($1)
        RETURNING *
    `, [name]);
    return result.rows[0];
}

export const getChatRoomLogs = async (chatRoomName: string, limit: number = 10): Promise<string[]> => {
    const client = await getClient();
    const result: QueryResult = await client.query(`
    SELECT content
    FROM messages
    WHERE chat_room_name = $1
    ORDER BY created_at
    LIMIT $2;
    `, [chatRoomName, limit]);
    return result.rows;
}

export const createOrReturnUser = async (username: string): Promise<User> => {

    const client = await getClient();
    const result: QueryResult<User> = await client.query(`
        WITH i AS(
            INSERT INTO users ("username") 
                   VALUES ($1) 
            ON CONFLICT("username") DO NOTHING
            RETURNING *
        )
        SELECT * FROM i
        UNION
        SELECT * FROM users WHERE username=$1`, [username])
    return result.rows[0];
}

export const saveMessage = async (
    username: string, 
    chatroomName: number,
    message: string,
) => {
    const client = await getClient();
    await client.query(`
        INSERT INTO messages (content, chat_room_name, username)
        VALUES ($1, $2, $3)`, [message, 
            chatroomName,
            username
        ])
}
