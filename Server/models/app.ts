import * as express from 'express';
import * as bodyParser from 'body-parser';

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
    }

    private setRoutes(): void {
        // Set up the app routes here
    }
}

export default new App().app;

