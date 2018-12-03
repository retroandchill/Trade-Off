import DatabaseConnector from "./DatabaseConnector";
import * as bcrypt from 'bcrypt';
import * as e from "express";

export default class DatabaseConnectorUser extends DatabaseConnector {

    constructor() {
        super();
    };

    public async loginUser(req: e.Request, res: e.Response){

        let passUserDataModel = this.connection.model('user', this.user);
        return passUserDataModel.findOne({'email': req.body.Email}, 'passHash passSalt', function(err, result) {
            if(err) {
                console.log('FREAKING SCATTER! THEY CAN\'T CATCH US ALL!');
                return false;
            }

            if(result == null) {
                console.log("[Warning] Supplied email address doesn't match a schema entry");
                return false;
            }

            console.log(result);

            // Check if a rehashed password using the same salt produces what we retrieved from the database
            // @ts-ignore
            if(bcrypt.hashSync(req.body.Password, result.passSalt) == result.passHash) {
                return true;
            }

            else {
                return false;
            }
        });
    }

    public registerUser(passWord: string, email: string): boolean{

        let salt = bcrypt.genSaltSync(1);
        let hash = bcrypt.hashSync(passWord, salt);

        //NOTE: MAKE SURE TO USE THE CONNECTION MODEL, NOT THE MONGOOSE.MODEL LISTED IN DOCUMENTS
        let User = this.connection.model('User', this.user);

        let userQuery = new User({ passHash: hash, email: email, passSalt: salt });

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

    public InsertDailyEndOfDayWorth(currentDate: Date, currentMoney: Number): boolean{

        //NOTE: MAKE SURE TO USE THE CONNECTION MODEL, NOT THE MONGOOSE.MODEL LISTED IN DOCUMENTS
        let userAccountWorthHistory = this.connection.model('userAccountWorthHistory', this.user);

        let userQuery = new userAccountWorthHistory({ referenceDate: Date, dailyEndMoneyAmount: Number});

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

    public async getUser(email: string) {

        let user = this.connection.model('user', this.user);
        return user.find({'email': email}, function(err, result) {
            if(err) {
                console.log("This user doesn't exist");
                //TODO: Log this somewhere
                return {};
            }

            // The user exists, return the object
            return result;
        });
    }
}