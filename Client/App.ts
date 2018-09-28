import express from 'express';
import bodyParser from 'body-parser';
import {TrafficRouter} from "./routes/TrafficRouter";

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

        this.app.use(bodyParser.json());

    }

    private setRoutes(): void {

        // Set Express to always serve the static JS and CSS files in the view folder
        this.app.use('/css', express.static(__dirname + '/views/css'));
        this.app.use('/js', express.static(__dirname + '/views/js'));
        this.app.use('/assets', express.static(__dirname + '/views/assets'));
        this.app.use('/semantic', express.static(__dirname + '/semantic/dist'));

        // Plug in the traffic routers into the server
        this.app.use('/', TrafficRouter);
    }
}

export default new App().app;

