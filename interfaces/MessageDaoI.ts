import Message from "../models/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesToUser(uid: string): Promise<Message[]>;

    findAllMessagesFromUser(uid: string): Promise<Message[]>;

    findUserMessagesUser(uid: string, xuid: string): Promise<Message[]>;

    sendMessage(uid: string, xuid: string, message: Message): Promise<Message>;

    updateMessage(mid: string, message: Message): Promise<any>;

    deleteMessage(mid: string): Promise<any>;
};