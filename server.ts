/**
 * @file Server file
 */

import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
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

const PORT = 4000;
app.listen(process.env.PORT || PORT);