import {Router, Request, Response} from "express";

const router: Router = Router();


/**
 * Handle a POST request under /requestStock/<TICKER> which will pull the current daily value of the supplied
 * ticker and return it to the client. See {@link StockHandler#getStockCurrentData} for the return data
 */
router.post('/requestStock/:StockTicker', (req: Request, res: Response) => {

    //Parse the requested ticker from the parameters
    let ticker: String = req.params.StockTicker;

    //TODO: Handle stock updating and responses
});

export const StockRequestRouter: Router = router;