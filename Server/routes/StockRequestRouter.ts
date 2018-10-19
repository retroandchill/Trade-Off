import {Router, Request, Response} from "express";
import StockHandler from "../models/StockHandler";

const router: Router = Router();

const handler: StockHandler = new StockHandler();

router.post('/requestStock/:StockTicker', (req: Request, res: Response) => {

    //Parse the requested ticker from the parameters
    let ticker: String = req.params.StockTicker;

    //TODO: Handle stock updating and responses
});

export const StockRequestRouter: Router = router;