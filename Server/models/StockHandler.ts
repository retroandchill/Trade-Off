/*import {lookup, history} from 'yahoo-stocks';

export default class StockHandler {

    //TODO: Potentally change this to an async function
    public getStockCurrentData(ticker: String) {

        lookup(ticker).then(response => {
            return response;
        })

    };

    public getCurrentWeekStockData(ticker: String) {

        history(ticker).then(response => {
            return response;
        });

    }

    public getCurrentMonthStockData(ticker: String) {

        history(ticker, {interval: '1d', range: '1mo'}).then(response => {
            return response;
        });
    }

}*/