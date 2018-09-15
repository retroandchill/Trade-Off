import mongoose from "mongoose";

export default class DatabaseConnector {

    constructor() {

        // Create the DatabaseConnector connection to the MongoDB shared server
        mongoose.connect('mongodb://testuser:testuser1@ds155862.mlab.com:55862/tradeoff', {useNewUrlParser: true})
        let db = mongoose.connection;

        // Give a console notification as to if our connection succeeded or not (async)
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('Connected to the mongoDB cloud server!');
        });

        /*
        * Create your Mongoose Schema here? Or make this abstract, and extend it for more Object-Oriented type design!
        * You decide!
         */
    }
}
