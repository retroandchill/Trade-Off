/**
 * DatabaseConnector class with Singleton implemented allowing only one core connector class to be available
 * at a time, thus preventing multiple connections from eventually causing errors in the server.
 */
import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export default abstract class DatabaseConnector {

    // The only active instance of this class
    private static _instance: DatabaseConnector;

    //The mongoose database connection created by the constructor
    protected connection: mongoose.Connection;

    protected UserOwnedTicker = new Schema({
        ticker: String,
        boughtAtPrice: Number,
        numberOfShares: Number,
        date: { type: Date, default: Date.now }
    });

    protected user = new Schema({
        username: String,
        passHash: String,
        email: String,
        passSalt: String,
        ownedTickers: [this.UserOwnedTicker],
        currentMoney: Number
    });




    protected constructor() {

        // Create the DatabaseConnector connection to the MongoDB shared server ONLY if one doesn't exist
        // @ts-ignore
        if(this.connection == null) {

            // Create the connection to the MongoDB MLab server
            mongoose.connect('mongodb://testuser:testuser1@ds155862.mlab.com:55862/tradeoff', {useNewUrlParser: true})
            this.connection = mongoose.connection;

            // Give a console notification as to if our connection succeeded or not (async)
            this.connection.on('error', console.error.bind(console, 'connection error:'));
            this.connection.once('open', function () {
                console.log('Connected to the mongoDB cloud server!');
            });
        }
    }

}
