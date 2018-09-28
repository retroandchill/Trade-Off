import DatabaseConnector from "./DatabaseConnector";
import {default as mongoose, Schema} from "mongoose";
import bcrypt from 'bcrypt';

export default class DatabaseConnectorUser extends DatabaseConnector {


    private user = new Schema({
        username: String,
        passHash: String,
        email: String,
        passSalt: String
    });


    protected super() {

    }

    public loginUser(userName, password): boolean{

        var passUserDataModel = mongoose.model('passUserDataModel', this.user);
        passUserDataModel.findOne({'userName': userName}, 'username, passHash', function(err, result) {
            if(err) {
                console.log('FREAKING SCATTER! THEY CAN\'T CATCH US ALL!');
            }

            // @ts-ignore
            return (bcrypt.compareSync(password, result.passHash));
        })

        // User didn't exist
        return false;

    }

    public registerUser(userName, passWord, email){
        var salt = bcrypt.genSaltSync(1); //this value needs to exist probably hard code it lol -- Yup!
        var hash = bcrypt.hashSync(passWord, salt);

        var user = new user({ username: userName, passHash: hash, email: email, passSalt: salt });
        user.save(function (err) {
            if (err)
            {
                console.log('FAAAAKK REGISTERING USER WONT SAVE!!!! SEND HELP!');
            }
            // saved!
        });

    }

}