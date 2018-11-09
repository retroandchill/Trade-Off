import DatabaseConnector from "./DatabaseConnector";
import * as bcrypt from 'bcrypt';
import {Schema} from 'mongoose';
import * as mongoose from "mongoose";

export default class DatabaseConnectorUser extends DatabaseConnector {

    constructor() {
        super();
    };

    private Schema = Schema;

    public loginUser(userName: string, password: string): boolean{

        let passUserDataModel = this.connection.model('user', this.user);
        passUserDataModel.findOne({'userName': userName}, 'username, passHash', function(err, result) {
            if(err) {
                console.log('FREAKING SCATTER! THEY CAN\'T CATCH US ALL!');
            }
            console.log("result: " + result);
            console.log("passhash: " + result.passHash);
            console.log("password: " + password);
            return (bcrypt.compareSync(password, result.passHash));

        });

        // User didn't exist
        return false;

    }

    public registerUser(userName: string, passWord: string, email: string): boolean{

        let salt = bcrypt.genSaltSync(1);
        let hash = bcrypt.hashSync(passWord, salt);

        //NOTE: MAKE SURE TO USE THE CONNECTION MODEL, NOT THE MONGOOSE.MODEL LISTED IN DOCUMENTS
        let User = this.connection.model('User', this.user);

        let userQuery = new User({ username: userName, passHash: hash, email: email, passSalt: salt });

        // @ts-ignore
        userQuery.save(err => {
            if (err)
            {
                console.log('FAAAAKK REGISTERING USER WONT SAVE!!!! SEND HELP!');
                return false;
            }
        });

        // The entry has been saved properly
        return true;
    }

    public getUserHistoryDateByRange(userName: string, lowerBoundDate: Date, upperBoundDate: Date): boolean{

        let passUserDataHistoryModel = this.connection.model('passUserDataHistoryModel', this.user);
        passUserDataHistoryModel.find({'userName': userName, 'Date': {$gte: lowerBoundDate, $lte: upperBoundDate}}, function(err, result) {
            if(err) {
                console.log('FREAKING SCATTER! THEY CAN\'T CATCH US ALL!');
            }

            //@ts-ignore
            return result;
        });

        // User didn't exist
        return false;

    }

    public InsertDailyEndOfDayWorth(userName: string, currentDate: Date, currentMoney: Number): boolean{

        //NOTE: MAKE SURE TO USE THE CONNECTION MODEL, NOT THE MONGOOSE.MODEL LISTED IN DOCUMENTS
        let userAccountWorthHistory = this.connection.model('userAccountWorthHistory', this.user);

        let userQuery = new userAccountWorthHistory({ username: userName, referenceDate: Date, dailyEndMoneyAmount: Number});

        // @ts-ignore
        userQuery.save(err => {
            if (err)
            {
                console.log('FAAAAKK REGISTERING USER WONT SAVE!!!! SEND HELP!');
                return false;
            }
        });

        // The entry has been saved properly
        return true;
    }

}