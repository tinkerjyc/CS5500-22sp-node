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
const BookmarkModel_1 = __importDefault(require("../mongoose/bookmarks/BookmarkModel"));
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @implements {BookmarkDaoI}
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * Uses BookmarkModel to retrieve all user documents from users collection
         * that bookmarked a particular tuit
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when the users are retrieved from
         * database
         */
        this.findAllUsersThatBookmarkedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ bookmarkedTuit: tid })
                .populate("bookmarkedUser")
                .exec();
        });
        /**
         * Uses BookmarkModel to retrieve all tuit documents from tuits collection
         * that were bookmarked by a particular user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllTuitsBookmarkedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ bookmarkedUser: uid })
                .populate("bookmarkedTuit")
                .exec();
        });
        /**
         * Inserts bookmark instance of a particular user on a particular tuit
         * into the database
         * @param {string} uid User's primary key
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when bookmark is inserted into the database
         */
        this.userBookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ bookmarkedUser: uid, bookmarkedTuit: tid }); });
        /**
         * Removes bookmark instance of a particular user on a particular tuit
         * from the database
         * @param {string} uid User's primary key
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when bookmark is removed from the database
         */
        this.userUnbookmarksTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ bookmarkedUser: uid, bookmarkedTuit: tid }); });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates singleton DAO instance
 * @returns BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
