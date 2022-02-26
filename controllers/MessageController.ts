/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/Message";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the messaging HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/users/:uid/inboxes to retrieve all the messages sent to a user
 *     </li>
 *     <li>GET /api/users/:uid/messages/:xuid to retrieve all message sent between two users
 *     </li>
 *     <li>POST /api/users/:uid/messages/:xuid to sent message to user
 *     </li>
 *     <li>DELETE /api/messages/:mid to delete message </li>
 *     <li>PUT /api/messages/:mid to update message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:uid/inboxes", MessageController.messageController.findAllMessagesToUser);
            app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesFromUser);
            app.get("/api/users/:uid/messages/:xuid", MessageController.messageController.findUserMessagesUser);
            app.post("/api/users/:uid/messages/:xuid", MessageController.messageController.sendMessage);
            app.put("/api/messages/:mid", MessageController.messageController.updateMessage);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    /**
     * Retrieves all message that sent to a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user received message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllMessagesToUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesToUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages that sent from a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user sent message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllMessagesFromUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesFromUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages sent from a userA to userB from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user sent the messages
     * parameter xuid representing the user receive the messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects that were messaged
     */

    findUserMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.findUserMessagesUser(req.params.uid, req.params.xuid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the message
     * and the message being messaged
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.sendMessage(req.params.uid, req.params.xuid, req.body.message)
            .then((messages: Message) => res.json(messages));

    /**
     * Records that a message was updated
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the message being deleted
     * @param {Response} res Represents response to client, including the
     * status on whether updating the message was successful or not
     */
    updateMessage = (req: Request, res: Response) =>
        MessageController.messageDao.updateMessage(req.params.mid, req.body)
            .then((status) => res.send(status));

    /**
     * Records that a message was deleted
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the message being deleted
     * @param {Response} res Represents response to client, including the
     * status on whether deleting the message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid)
            .then((status) => res.send(status));
};