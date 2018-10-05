import DatabaseConnector from "./DatabaseConnector";
import {Schema} from "mongoose";
import * as mongoose from "mongoose";

export default class DatabaseConnectorUser extends DatabaseConnector {

    /**
     * Constructor for the class which simply calls the parent constructor, thus creating the MongoDB connection
     */
    constructor() {
        super();
    };

    private Schema = mongoose.Schema;





}