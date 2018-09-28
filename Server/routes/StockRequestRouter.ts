import {Router, Request, Response} from "express";

const router: Router = Router();

router.post('/requestStock/:StockTicker', (req: Request, res: Response) => {

    //Parse the requested ticker from the parameters
    let ticker: String = req.params.StockTicker;

    //TODO: Handle stock updating and responses
})