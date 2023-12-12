export interface ChatRoom {
    name: string;
}

export interface Message {
    id: number;
    content: string;
    createdAt: Date;
    chatRoomId: number;
    userId: number;
}

export interface User {
    username: string;
}
