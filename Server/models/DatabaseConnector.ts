import {Schema} from "mongoose";

const mongoose = require('mongoose');

export default abstract class DatabaseConnector {

    // The mongoose database connection created by the consturctor
    //@ts-ignore
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

        mongoose.connect('mongodb://testuser:testuser1@ds155862.mlab.com:55862/tradeoff', {useNewUrlParser: true});
        this.connection = mongoose.connection;

        // Give a console notification if we've connected properly!
        this.connection.on('error', console.error.bind(console, 'connection error:'));
        this.connection.once('open', function () {
            console.log('Connected to the mongoDB cloud server!');
        });
    }
}