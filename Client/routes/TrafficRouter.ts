//TODO: Add CORS security

import {Router, Request, Response} from "express";
import * as path from "path";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.resolve("../Client/views/MainPage.html"));
})

router.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.resolve("../Client/views/Login.html"));
})

export const TrafficRouter: Router = router;