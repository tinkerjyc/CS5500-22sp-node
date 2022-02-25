import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsUser(req: Request, res: Response): void;

    userUnfollowsUser(req: Request, res: Response): void;

    findAllUsersFollowing(req: Request, res: Response): void;

    findAllUsersFollower(req: Request, res: Response): void;

    userRemoveFollower(req: Request, res: Response): void;

    findAllFollows(req: Request, res: Response): void;
};