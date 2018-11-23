import express from 'express';
import bodyParser = require("body-parser");
import cors from 'cors';
import {UserManagementRouter} from "../routes/UserManagementRouter";
import {StockRequestRouter} from "../routes/StockRequestRouter";
import session = require("express-session");
import schedule = require('node-schedule');
import * as mongoose from "mongoose";
import {Model} from "mongoose";

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.setRoutes();
        this.setupSchedules();
    }

    private config(): void {

        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());

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

    private setupSchedules() {
        // For each user, at the end of every trading day, store the user end of worth for displaying the chart nicely
        // The task is to be run on monday-friday at hour 17 (5:00 PM)
        var userWorthTask = schedule.scheduleJob('* 17 * * 1-5', function() {

            console.log("Starting EOD Processing..");
            // Get all of the users registered in the system
            //let userSchema: Model = mongoose.model('')

        })
    }
}

export default new App().app;