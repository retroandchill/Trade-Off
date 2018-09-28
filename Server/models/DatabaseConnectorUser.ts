import DatabaseConnector from "./DatabaseConnector";
import {Schema} from "mongoose";
import bcrypt from 'bcrypt';
import * as mongoose from "mongoose";

export default class DatabaseConnectorUser extends DatabaseConnector {

    /**
     * Constructor for the class which simply calls the parent constructor, thus creating the MongoDB connection
     */
    constructor() {
        super();
    };

    private Schema = mongoose.Schema;

    private user = new Schema({
        username: String,
        passHash: String,
        email: String,
        passSalt: String
    });

    public loginUser(userName, password): boolean{

        let passUserDataModel = mongoose.model('passUserDataModel', this.user);
        passUserDataModel.findOne({'userName': userName}, 'username, passHash', function(err, result) {
            if(err) {
                console.log('FREAKING SCATTER! THEY CAN\'T CATCH US ALL!');
            }

            // @ts-ignore
            return (bcrypt.compareSync(password, result.passHash));
        });

        // User didn't exist
        return false;

    }

    public registerUser(userName, passWord, email){
        let salt = bcrypt.genSaltSync(1);
        let hash = bcrypt.hashSync(passWord, salt);

        //NOTE: MAKE SURE TO USE THE CONNECTION MODEL, NOT THE MONGOOSE.MODEL LISTED IN DOCUMENTS
        let User = this.connection.model('User', this.user);

        var userQuery = new User({ username: userName, passHash: hash, email: email, passSalt: salt });
        userQuery.save(function (err) {
            if (err)
            {
                console.log('FAAAAKK REGISTERING USER WONT SAVE!!!! SEND HELP!');
            }
        });

    }

}