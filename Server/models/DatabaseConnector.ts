import mongoose from "mongoose";

export default class DatabaseConnector {

    constructor() {

        // Create the DatabaseConnector connection to the MongoDB shared server
        mongoose.connect('mongodb://testuser:testuser1@ds155862.mlab.com:55862/tradeoff', {useNewUrlParser: true})
        let db = mongoose.connection;

        // Give notification as to if our connection succeeded or not
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('Connected to the mongoDB cloud server!');
        });
    }
}
