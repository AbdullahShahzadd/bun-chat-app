import {getClient} from "../index";
import {ChatRoom} from "../../types";
import {QueryResult} from "pg";

export const getChatRoomById = async (id: number): Promise<ChatRoom> => {
    const client = await getClient();
    const result: QueryResult<ChatRoom> = await client.query(`
        SELECT *
        FROM chat_rooms cr
        WHERE cr.id = $1
    `, [id]);
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

export const getChatRoomLogs = async (chatRoomId: number, limit: number = 10): Promise<string[]> => {
    const client = await getClient();
    const result: QueryResult<string> = await client.query(`
    SELECT content
    FROM messages
    WHERE chat_room_id = $1
    ORDER BY created_at
    LIMIT $2;
    `, [chatRoomId, limit]);
    return result.rows;
}