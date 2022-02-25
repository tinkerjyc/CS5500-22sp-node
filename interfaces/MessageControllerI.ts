import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllMessagesToUser(req: Request, res: Response): void;

    findAllMessagesFromUser(req: Request, res: Response): void;

    findUserMessagesUser(req: Request, res: Response): void;

    sendMessage(req: Request, res: Response): void;

    updateMessage(req: Request, res: Response): void;

    deleteMessage(req: Request, res: Response): void;
};