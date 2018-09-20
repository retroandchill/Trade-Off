import DatabaseConnector from "./DatabaseConnector";
import {Schema} from "mongoose";

export default class DatabaseConnectorUser extends DatabaseConnector {


    private user = new Schema({
        username: String,
        passHash: String,
        email: String,
        passSalt: String
    });


    protected super() {

    }


}