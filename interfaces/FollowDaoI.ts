import Follow from "../models/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser(uid: string, xuid: string): Promise<Follow>;

    userUnfollowsUser(uid: string, xuid: string): Promise<any>;

    findAllUsersFollowing(uid: string): Promise<Follow[]>;

    findAllUsersFollower(uid: string): Promise<Follow[]>;
};