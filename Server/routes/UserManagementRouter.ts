//TODO: Add CORS security

import {Router, Request, Response} from "express";
import DatabaseConnectorUser from "../models/DatabaseConnectorUser";

const router: Router = Router();
const userDatabase: DatabaseConnectorUser = new DatabaseConnectorUser();

/**
 * Handle a POST request under /registrationhandler which attempts to register a username, password and email to the server
 * Sets HTTP status 403 if the post body was not correct
 * Sets HTTP status 201 if everything went alright and the resource was created
 * Sets HTTP status 503 if the registration failed for some reason. (Should never happen, but might)
 */
router.post('/registrationhandler', (req: Request, res: Response) => {
    let username: string = req.query.username;
    let password: string = req.query.password;
    let email: string = req.query.email;

    if(username == null || password == null || email == null) {

        // There was malformed information being sent from the client somehow. Send a proper error code.
        res.status(403).send('Malformed POST input').end();
    }

    if(userDatabase.registerUser(username, password, email)) {

        // The user was able to register properly!
        res.status(201).send('Registered successfully!').end();

        console.log('User registered:' + username);
    }

    // Something weird happen on the server!
    res.status(503).send('Server has encountered an error').end();
});


/**
 * Handle a POST request under /loginhandler which attempts to authenticate a user to it's equivalent in the database
 * Sets HTTP status 200 if everything went alright
 * Sets HTTP status 401 if the user is unauthorized
 * Returns a string value with either 'success' or 'failed' to the requester based on if the request succeeded or not
 */
router.post('/loginhandler', (req: Request, res: Response) => {
    let username = req.query.username;
    let password: string = req.query.password;

    if(userDatabase.loginUser(username, password)) {

        //TODO: The user has logged in! Create a session for them!

        res.status(200);
    }

    else {
        // The credentials were probably incorrect. Send HTTP Code 401
        res.status(401);
    }

});

export const UserManagementRouter: Router = router;