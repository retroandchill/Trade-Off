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

    public loginUser(userName, passHash, passSalt){
        var passUserDataModel = mongoose.model('passUserDataModel', this.user);
        var passUserDataModel = passUserDataModel.findOne({'userName': 'userName'});
        passUserDataModel.select('userName');

        var passUserPassModel = mongoose.model('passUserPassModel', this.user);
        var passUserPassModel = passUserDataModel.findOne({'passHash': 'passHash'});
        passUserPassModel.select('passHash');

        passUserDataModel.exec(function (err, userName) {
            if (err) return handleError(err); //idk what this is dan just copy pasted it u judge
            console.log('Wrong user name or password: %s', userName);
        }

        return (bcrypt.compareSync(myPlaintextPassword, passHash)); //myplaintextpassword should be the plaintextpassword we're fuckin something up
        // fuk u bcrypt


    }

    public registerUser(userName, passWord, email){
        var salt = bcrypt.genSaltSync(saltRounds); //this value needs to exist probably hard code it lol
        var hash = bcrypt.hashSync(passWord, salt);

        var user = new user({ username: userName, passHash: hash, email: email, passSalt: salt });
        user.save(function (err) {
            if (err) return handleError(err); // what is this errorhandler shit
            // saved!
        });

    }

}