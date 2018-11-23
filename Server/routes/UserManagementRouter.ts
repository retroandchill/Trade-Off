import {Router, Request, Response} from "express";
import DatabaseConnectorUser from "../controllers/DatabaseConnectorUser";

const router: Router = Router();
const userDatabase: DatabaseConnectorUser = new DatabaseConnectorUser();

/**
 * Handle a POST request under /registrationhandler which attempts to register a username, password and email to the server
 * Sets HTTP status 403 if the post body was not correct
 * Sets HTTP status 201 if everything went alright and the resource was created
 * Sets HTTP status 503 if the registration failed for some reason. (Should never happen, but might)
 */
router.post('/registrationhandler', (req: Request, res: Response) => {

    //TODO: Don't allow users to register twice with the same email address

    let password: string = req.body.password;
    let email: string = req.body.email;

    if(password == null || email == null) {

        // There was malformed information being sent from the client somehow. Send a proper error code.
        res.status(403).end();
    }

    if(userDatabase.registerUser(password, email)) {

        // The user was able to register properly!
        res.status(201).end();

        console.log('User registered:' + email);
    }

    // Something weird happen on the server!
    res.status(503).end();
});


/**
 * Handle a POST request under /loginhandler which attempts to authenticate a user to it's equivalent in the database
 * Sets HTTP status 200 if everything went alright
 * Sets HTTP status 401 if the user is unauthorized
 * Returns a string value with either 'success' or 'failed' to the requester based on if the request succeeded or not
 */
router.post('/loginhandler', (req: Request, res: Response) => {
    let username = req.params.username;
    let password = req.params.password;

    if(userDatabase.loginUser(username, password)) {

        // The user exists! Set their username in their session values
        // @ts-ignore
        req.session.username = username;

        // Redirect them to the stocks page
        res.redirect('/stocks');

        res.status(200);
    }

    else {
        // The credentials were probably incorrect. Send HTTP Code 401
        res.status(401);
    }

});

/**
 * Handle a GET request under /logout which destroys the user session and redirects them back to the home page
 * Sets HTTP status 200 if everything went alright
 * Sets HTTP status 503 if there was a server error
 */
router.get('/logout', (req: Request, res: Response) => {
    // @ts-ignore
    req.session.destroy(function (err) {
        if(err) {
            // Failed
            res.status(503).end();
        }
        else {
            // Complete! Redirect the user
            res.redirect('/');
        }
    })
});

export const UserManagementRouter: Router = router;