//TODO: Add CORS security

import {Router, Request, Response} from "express";
import DatabaseConnectorUser from "../models/DatabaseConnectorUser";

const router: Router = Router();
const userDatabase: DatabaseConnectorUser = new DatabaseConnectorUser();

/**
 * Handle a POST request under /registrationhandler which attempts to register a username, password and email to the server
 * Sets HTTP status 201 if everything went alright and the resource was created
 * Sets HTTP status 503 if the registration failed for some reason. (Should never happen, but might)
 */
router.post('/registrationhandler', (req: Request, res: Response) => {
    let username: string = req.body.username;
    let password: string = req.body.password;
    let email: string = req.body.email;

    //TODO: Attempt a registration event here
});


/**
 * Handle a POST request under /loginhandler which attempts to authenticate a user to it's equivalent in the database
 * Sets HTTP status 200 if everything went alright
 * Sets HTTP status 401 if the user is unauthorized
 * Returns a string value with either 'success' or 'failed' to the requester based on if the request succeeded or not
 */
router.post('/loginhandler', (req: Request, res: Response) => {
    let username = req.body.username;
    let password: string = req.body.password;

    //TODO: Attempt a login event here
})