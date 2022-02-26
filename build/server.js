"use strict";
/**
 * @file Server file
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const mongoose_1 = __importDefault(require("mongoose"));
// connect to the database
const connectionString = `mongodb+srv://root:toor@whiteboard.quiue.mongodb.net/movie-db?retryWrites=true&w=majority`;
mongoose_1.default.connect(connectionString);
// create RESTful Web service API
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => res.send('Welcome!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
