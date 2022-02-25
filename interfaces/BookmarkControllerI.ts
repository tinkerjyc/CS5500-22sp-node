import {Request, Response} from "express";

export default interface BookmarkControllerI {
    findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;

    findAllTuitsBookmarkedByUser(req: Request, res: Response): void;

    userUnbookmarksTuit(req: Request, res: Response): void;

    userBookmarksTuit(req: Request, res: Response): void;

    findAllBookmarks(req: Request, res: Response): void;
};