import {setTime, initDays} from './exports/time.js';
import {getCryptos, streamCoinbase, setFearAndGreed} from './exports/crypto.js';
import {getStocks} from "./exports/stocks.js";

setTime("time");
streamCoinbase( "btc","eth");
setFearAndGreed();
initDays();
getStocks();
getCryptos();