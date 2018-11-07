// @ts-ignore
import {lookup, history} from 'yahoo-stocks';

export default class StockHandler {

    //TODO: Potentally change this to an async function
    public async getStockCurrentData(ticker: String) {

        return lookup(ticker);

    };

    public async getCurrentWeekStockData(ticker: String) {
        return history(ticker);
    }

    public getCurrentMonthStockData(ticker: String) {
        return history(ticker, {interval: '1d', range: '1mo'});
    }

}