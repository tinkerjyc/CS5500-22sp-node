/**
 * @file Server file
 */

import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import BookMarkController from "./controllers/BookMarkController";
import FollowController from "./controllers/FollowController";
import MessageController from "./controllers/MessageController";

import mongoose from "mongoose";

// connect to the database
const connectionString = `mongodb+srv://root:toor@whiteboard.quiue.mongodb.net/movie-db?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

// create RESTful Web service API
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const bookMarksController = BookMarkController.getInstance(app);
const followsController = FollowController.getInstance(app);
const messagesController = MessageController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);