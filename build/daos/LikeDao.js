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
const LikeModel_1 = __importDefault(require("../mongoose/likes/LikeModel"));
class LikeDao {
    constructor() {
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ tuit: tid })
                .populate("likedBy")
                .exec();
        });
        this.findAllTuitsLikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default
                .find({ likedBy: uid })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
                .exec();
        });
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.create({ tuit: tid, likedBy: uid }); });
        this.findUserLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.findOne({ tuit: tid, likedBy: uid }); });
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid }); });
        this.countHowManyLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.count({ tuit: tid }); });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
