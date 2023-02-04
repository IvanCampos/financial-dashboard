import {addCommas} from './numbers.js';
import {setQuotes} from "./yhooHelper.js";

export function getCryptos() {
    const URL = 'https://ij4tn9jyvc.execute-api.us-east-1.amazonaws.com/crypto';
    setQuotes(URL, "cryptos");
}

export function streamCoinbase(divId_btc, divId_eth) {
    let ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");

    let msg = JSON.stringify({
        type: 'subscribe',
        product_ids: ['BTC-USD','ETH-USD'],
        channels : [{
            name: 'ticker',
            product_ids: ['BTC-USD','ETH-USD']
        }]
    })

    ws.onopen = function() {
        //console.log("Coinbase connected...");
        ws.send(msg);
    };

    ws.onmessage = function(evt) {
        try {
            let messages = JSON.parse(evt.data);
            //console.log("msg: " + JSON.stringify(messages));
            if (messages.product_id == "BTC-USD") {
                if (document.getElementById(divId_btc)) {
                    document.getElementById(divId_btc).innerText = addCommas(messages.price, 2);
                }
            } else if (messages.product_id == "ETH-USD") {
                if (document.getElementById(divId_eth)) {
                    document.getElementById(divId_eth).innerText = addCommas(messages.price, 2);
                }
            }
        } catch (e) {
            console.log('Unknown message: ' + evt.data, e);
        }
    }

    ws.onclose = function() {
        console.log("Coinbase disconnected");
    }
}

const BOX = "box";
const EXTREME_FEAR = "EXTREME FEAR";
const FEAR = "FEAR";
const GREED = "GREED";
const EXTREME_GREED = "EXTREME GREED";

export function setFearAndGreed() {
    fetch('https://api.alternative.me/fng/').then(function (response) {
        return response.json();
    }).then(function (data) {
        let num = data.data[0].value;
        if (num < 25) {
            setItem("extreme-fear", "red", EXTREME_FEAR, BOX);
        } else if (num >= 25 && num < 50) {
            setItem("fear", "#EF4657", FEAR, BOX);
        } else if (num >= 50 && num < 75) {
            setItem("greed", "#85bb65", GREED, BOX);

        } else if (num >= 75) {
            setItem("extreme-greed", "green", EXTREME_GREED, BOX);
        }
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
}

function setItem(divId, color, text, type) {
    document.getElementById(divId).style.backgroundColor = color;
    document.getElementById(divId).style.boxShadow = "0 0 1.5rem " + color;
    document.getElementById(divId).style.verticalAlign = "middle";
    if (text.indexOf(FEAR) != -1) {
        document.getElementById(divId).style.animation = "fear-pulse 210ms 21";
    } else {
        document.getElementById(divId).style.animation = "greed-pulse 210ms 21";
    }

    if (type == BOX) {
        document.getElementById(divId).style.border = "0.1rem solid " + color;
        document.getElementById(divId).style.color = "white";
    }
}