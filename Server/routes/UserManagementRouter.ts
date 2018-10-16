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

    if(userDatabase.registerUser(username, password, email)) {

        // The user was able to register properly!
        res.sendStatus(201);
    }

    // Something weird happen on the server!
    res.sendStatus(503);
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

    if(userDatabase.loginUser(username, password)) {

        //TODO: The user has logged in! Create a session for them!

        res.sendStatus(200);
    }

    else {
        // The credentials were probably incorrect. Send HTTP Code 401
        res.sendStatus(401);
    }

})

export const UserManagementRouter: Router = router;