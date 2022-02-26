/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /users/:uid/follows/:xuid to record that user follows another user
 *     </li>
 *     <li>DELETE /users/:uid/follows/:xuid to record that user unfollows another user
 *     </li>
 *     <li>GET /users/:uid/follows to retrieves a list of other users they are following
 *     </li>
 *     <li>GET / users/:uid/followers to retrieves a list of other users that are following them
 *     </li>
 *     <li>DELETE /users/:uid/followers/:xuid to removes a follower
 *     </li>
 *     <li>GET /follows to retrieves  all follows records
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/following", FollowController.followController.findAllUsersFollower);
            app.get("/api/users/:uid/followedby", FollowController.followController.findAllUsersFollowing);
            app.post("/api/users/:uid/follows/:xuid", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid/follows/:xuid", FollowController.followController.userUnfollowsUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * Retrieves all users that followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user following other users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowing(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves a list of other users that are following a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the users followed another users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were followd
     */
    findAllUsersFollower = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollower(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and xuid representing the user that is following another user
     * and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.xuid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and xuid representing the user that is unfollowing
     * another user and the user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.xuid)
            .then(status => res.send(status));
};