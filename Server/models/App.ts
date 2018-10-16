import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {UserManagementRouter} from "../routes/UserManagementRouter";

class App {
    public app: express.Application;

    constructor()
    {
        this.app = express();
        this.config();
        this.setRoutes();

    }

    private config(): void {

        //Setup Cors and access control information here

        this.app.use(bodyParser.json({limit: '500mb'}));
        this.app.use(bodyParser({limit: '50mb'}));

        this.app.use(cors({origin: 'http://localhost:80'}));
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });

    }

    private setRoutes(): void {
        // Set up the app routes here
        this.app.use('/', UserManagementRouter);
    }
}

export default new App().app;

