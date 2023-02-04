import {setQuotes} from "./yhooHelper.js";

export function getStocks() {
    const URL = 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=AAPL,TSLA,GOOG,NVDA,NFLX,AMD,AMZN,ARKK,DIS,TEAM,SQ,NKE,BABA,GBTC,ETHE,MSFT,PYPL,BTC-USD,ETH-USD,ADA-USD,SOL-USD,VGX-USD,XTZ-USD,AAVE-USD,UNI3-USD,DOT1-USD,DOGE-USD,MANA-USD,AVAX-USD';
    setQuotes(URL, "stocks");
}