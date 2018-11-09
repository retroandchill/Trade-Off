import {Router, Request, Response} from "express";
import StockHandler from "../models/StockHandler";

const router: Router = Router();

const stock: StockHandler = new StockHandler();


/**
 * Handle a POST request under /requestStock/<TICKER> which will pull the current daily value of the supplied
 * ticker and return it to the client. See {@link StockHandler#getStockCurrentData} for the return data
 */
router.post('/requestStockDaily/:StockTicker', async (req: Request, res: Response) => {

    //Parse the requested ticker from the parameters
    let ticker: String = req.params.StockTicker;

    try {
        let val = await stock.getStockCurrentData(ticker);
        res.send(val).status(201).end();
    }
    catch(err) {
        // The ticker did not exist
        res.status(204).end();
    }
});

router.post('/requestStockWeekly/:StockTicker', async (req: Request, res: Response) => {

    // Parse the requested ticker from the parameters
    let ticker: String = req.params.StockTicker;

    try {
        let val = await stock.getCurrentWeekStockData(ticker);
        res.send(val).status(201).end();
    }
    catch (err) {
        console.log('Error!');
    }

});

router.post('/requestStockMax/:StockTicker', async (req: Request, res: Response) => {

    // Parse the requested ticker from the parameters
    let ticker: String = req.params.StockTicker;

    try {
        let val = await stock.getMaxStockData(ticker);
        res.send(val).status(201).end();
    }
    catch (err) {
        res.status(204).end();
    }
});

export const StockRequestRouter: Router = router;