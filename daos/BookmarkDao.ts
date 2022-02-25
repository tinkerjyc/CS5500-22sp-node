/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @implements {BookmarkDaoI}
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {
    }

    /**
     * Uses BookmarkModel to retrieve all user documents from users collection
     * that bookmarked a particular tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookmarkedUser")
            .exec();

    /**
     * Uses BookmarkModel to retrieve all tuit documents from tuits collection
     * that were bookmarked by a particular user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedUser: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Inserts bookmark instance of a particular user on a particular tuit
     * into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedUser: uid, bookmarkedTuit: tid});

    /**
     * Removes bookmark instance of a particular user on a particular tuit
     * from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedUser: uid, bookmarkedTuit: tid});
}