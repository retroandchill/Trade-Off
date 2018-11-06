import express from 'express';
import bodyParser = require("body-parser");
import cors from 'cors';
import {UserManagementRouter} from "../routes/UserManagementRouter";
import {StockRequestRouter} from "../routes/StockRequestRouter";
import session = require("express-session");

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.setRoutes();
    }

    private config(): void {

        this.app.use(bodyParser.urlencoded({extended: false}));

        this.app.use(cors({origin: 'http://localhost:80'}));
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });

        // Set up the session middleware - Do not use secure: true -- since we aren't using HTTPS
        this.app.use(session({
            secret: 'woah there bucko',
            resave: false,
            saveUninitialized: false // THIS MIGHT NEED TO BE TRUE!!! 'A session is uninitialized when it is new but not modified. '
        }))
    }

    private setRoutes(): void {
        // Set up the app routes here
        this.app.use('/', UserManagementRouter);
        this.app.use('/', StockRequestRouter);
    }
}

export default new App().app;