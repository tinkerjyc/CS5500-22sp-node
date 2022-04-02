"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
const MessageModel_1 = __importDefault(require("../mongoose/messages/MessageModel"));

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
class MessageDao {
    constructor() {
        /**
         * Uses MessageModel to retrieve all messages documents of sent messages
         * from messages collection for a particular user
         * @param {string} uid User's primary key
         * @returns Promise to be notified when the messages are retrieved from
         * database
         */
        this.findAllMessagesFromUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({from: uid});
        });
        /**
         * Uses MessageModel to retrieve all messages documents of received messages
         * from messages collection for a particular user
         * @param {string} uid User's primary key
         * @returns Promise to be notified when the messages are retrieved from
         * database
         */
        this.findAllMessagesToUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({to: uid});
        });
        /**
         * Find message instances of a particular user sending a message to
         * another user in the database
         * @param {string} uid Primary key of the user sending the message
         * @param {string} xuid Primary key of the user receiving the message
         * @returns All message from two users into a list
         */
        this.findUserMessagesUser = (uid, xuid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.find({from: uid, to: xuid})
                .populate("message")
                .exec();
        });
        /**
         * Inserts message instance of a particular user sending a message to
         * another user into the database
         * @param {string} uid Primary key of the user sending the message
         * @param {string} xuid Primary key of the user receiving the message
         * @param {Message} message Instance to be inserted into the database
         * @returns Promise To be notified when message is inserted into the database
         */
        this.sendMessage = (uid, xuid, message) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.create({from: uid, to: xuid, message: message});
        });
        /**
         * Changes message instance of a particular user sending a message to
         * another user into the database
         * @param {string} mid Primary key of the message
         * @param {Message} message Instance to be inserted into the database
         * @returns Promise To be notified when message is changed into the database
         */
        this.updateMessage = (mid, message) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.updateOne({_id: mid}, {$set: message});
        });
        /**
         * Removes message instance of a particular user that has sent a message to another
         * user from the database.
         * @param {string} mid Primary key of the message
         * @returns Promise To be notified when message is removed from the database
         */
        this.deleteMessage = (mid) => __awaiter(this, void 0, void 0, function* () {
            return MessageModel_1.default.deleteOne({_id: mid});
        });
    }
}

exports.default = MessageDao;
MessageDao.messageDao = null;
/**
 * Creates singleton DAO instance
 * @returns MessageDao
 */
MessageDao.getInstance = () => {
    if (MessageDao.messageDao === null) {
        MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
};
