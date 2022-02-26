/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @implements {FollowDaoI}
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    /**
     * Uses FollowModel to retrieve all follows documents of followers
     * from follows collection for a particular user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the followers are retrieved from
     * database
     */
    findAllUsersFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve all follows documents of following users
     * from follows collection for a particular user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the following users are retrieved from
     * database
     */
    findAllUsersFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowedBy: uid})
            .populate("userFollowedBy")
            .exec();

    /**
     * Inserts follow instance of a particular user following another user
     * into the database
     * @param {string} uid Primary key of the user following another user
     * @param {string} xuid Primary key of the user being followed by another user
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsUser = async (uid: string, xuid: string): Promise<Follow> =>
        FollowModel.create({userFollowing: uid, userFollowedBy: xuid});

    /**
     * Removes follow instance of a particular user following another user
     * from the database.
     * @param {string} uid Primary key of the user following another user
     * @param {string} xuid Primary key of the user being followed by another user
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsUser = async (uid: string, xuid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowedBy: xuid});
}