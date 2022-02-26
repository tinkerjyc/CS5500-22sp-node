/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/Message";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {
    }

    /**
     * Uses MessageModel to retrieve all messages documents of sent messages
     * from messages collection for a particular user
     * @param {string} uid User's primary key
     * @returns Promise to be notified when the messages are retrieved from
     * database
     */
    findAllMessagesFromUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid});

    /**
     * Uses MessageModel to retrieve all messages documents of received messages
     * from messages collection for a particular user
     * @param {string} uid User's primary key
     * @returns Promise to be notified when the messages are retrieved from
     * database
     */
    findAllMessagesToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid});

    /**
     * Find message instances of a particular user sending a message to
     * another user in the database
     * @param {string} uid Primary key of the user sending the message
     * @param {string} xuid Primary key of the user receiving the message
     * @returns All message from two users into a list
     */
    findUserMessagesUser = async (uid: string, xuid: string): Promise<Message[]> =>
        MessageModel.find({from: uid, to: xuid})
            .populate("message")
            .exec();

    /**
     * Inserts message instance of a particular user sending a message to
     * another user into the database
     * @param {string} uid Primary key of the user sending the message
     * @param {string} xuid Primary key of the user receiving the message
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    sendMessage =  async (uid: string, xuid: string, message: Message): Promise<Message> =>
        MessageModel.create({from: uid, to: xuid, message: message});

    /**
     * Changes message instance of a particular user sending a message to
     * another user into the database
     * @param {string} mid Primary key of the message
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is changed into the database
     */
    updateMessage = async (mid: string, message: Message): Promise<any> =>
        MessageModel.updateOne(
            {_id: mid},
            {$set: message});

    /**
     * Removes message instance of a particular user that has sent a message to another
     * user from the database.
     * @param {string} mid Primary key of the message
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

}