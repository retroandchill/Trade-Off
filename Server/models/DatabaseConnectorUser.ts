import DatabaseConnector from "./DatabaseConnector";
import {Schema} from "mongoose";

export default class DatabaseConnectorUser extends DatabaseConnector {

    public constructor() {
        // Create the connection to the database as defined in the abstract parent class
        super();
    }

    private user = new Schema({
        username: String,
        passHash: String,
        email: String,
        passSalt: String
    });


}