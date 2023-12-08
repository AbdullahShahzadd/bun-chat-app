export interface ChatRoom {
    id: number;
    name: string;
    lastActive: Date;
}

export interface Message {
    id: number;
    content: string;
    createdAt: Date;
    chatRoomId: number;
    userId: number;
}

export interface User {
    id: number;
    username: string;
}