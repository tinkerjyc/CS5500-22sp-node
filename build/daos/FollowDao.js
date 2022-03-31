"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowModel_1 = __importDefault(require("../mongoose/follows/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @implements {FollowDaoI}
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() {
        /**
         * Uses FollowModel to retrieve all follows documents of followers
         * from follows collection for a particular user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the followers are retrieved from
         * database
         */
        this.findAllUsersFollower = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowing: uid })
                .populate("userFollowing")
                .exec();
        });
        /**
         * Uses FollowModel to retrieve all follows documents of following users
         * from follows collection for a particular user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the following users are retrieved from
         * database
         */
        this.findAllUsersFollowing = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowedBy: uid })
                .populate("userFollowedBy")
                .exec();
        });
        /**
         * Inserts follow instance of a particular user following another user
         * into the database
         * @param {string} uid Primary key of the user following another user
         * @param {string} xuid Primary key of the user being followed by another user
         * @returns Promise To be notified when follow is inserted into the database
         */
        this.userFollowsUser = (uid, xuid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ userFollowing: uid, userFollowedBy: xuid }); });
        /**
         * Removes follow instance of a particular user following another user
         * from the database.
         * @param {string} uid Primary key of the user following another user
         * @param {string} xuid Primary key of the user being followed by another user
         * @returns Promise To be notified when follow is removed from the database
         */
        this.userUnfollowsUser = (uid, xuid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ userFollowing: uid, userFollowedBy: xuid }); });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton DAO instance
 * @returns FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
