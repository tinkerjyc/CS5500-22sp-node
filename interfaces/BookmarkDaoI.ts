import Bookmark from "../models/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    findAllUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]>;

    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;

    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;

    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;

    findAllBookmarks(): Promise<Bookmark[]>;
}