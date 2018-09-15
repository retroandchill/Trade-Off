import express from 'express';
import bodyParser from 'body-parser';
import DatabaseConnector from "./DatabaseConnector";

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

        //TODO: Remove this database object in favor of a singleton instance? We do not need this here. This is here just so the DB can be tested right now.
        let test: DatabaseConnector = DatabaseConnector.Instance;
    }

    private setRoutes(): void {
        // Set up the app routes here
    }
}

export default new App().app;

