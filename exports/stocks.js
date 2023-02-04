import {setQuotes} from "./yhooHelper.js";

export function getStocks() {
    //***SEE README FOR CORS SOLUTION USING AWS LAMBDA***
    const URL = 'YOUR_URL_TO_A_SERVER_SIDE_CALL_TO_YHOO_FINANCE_API_LIKE_AWS_LAMBDA';
    setQuotes(URL, "stocks");
}