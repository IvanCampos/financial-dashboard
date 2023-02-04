import {addCommas} from "./numbers.js";

export function setQuotes(URL, divId) {
    let quotes = [];

    fetch(URL)
        .then(function (response) {
            return response.json();
        }).then(function (stocks) {
        //console.log(stocks.Items[0].json.M.symbol.S);
        for (let i=0; i<stocks.Items.length; i++) {
            let ticker = stocks.Items[i].json.M.symbol.S;
            if (ticker.includes("-USD")) {
                ticker = ticker.substr(0, ticker.length - 4);
            }
            if (ticker.includes("1") ||
                ticker.includes("2") ||
                ticker.includes("3")) {
                ticker = ticker.substr(0, ticker.length - 1);
            }
            let price = addCommas(stocks.Items[i].json.M.regularMarketPrice.N,2);
            let change = parseFloat(stocks.Items[i].json.M.regularMarketChangePercent.N).toFixed(2);

            if (change > 0) {
                change = "+" + change;
            }
            let quote = {
                ticker: ticker,
                price: price,
                change: change
            };
            quotes.push(quote);
        }

        //console.log("Quotes: " + quotes.length);

        quotes.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1);
        let table = "<TABLE>";
        for (let j=0; j<quotes.length; j++) {
            let q = quotes[j];
            let plusMinus = (q.change.charAt(0) == "-" ? "minus" : "plus");
            if (plusMinus == "minus") {
                plusMinus = ( ((q.change.charAt(1) > 1) || (q.change.charAt(3) == ".")) ? "minus2" : "minus");
            } else {
                plusMinus = ( ((q.change.charAt(1) > 1) || (q.change.charAt(3) == ".")) ? "plus2" : "plus");
            }
            table += "<TR>";
            table += "<TD><span class='" + plusMinus + "'>" + q.ticker + "</span></TD>";
            table += "<TD>" + q.price + "</TD>";
            table += "<TD>" + q.change + "%</TD>";
            table += "</TR>";
        }
        table += "</TABLE>";
        //console.log("TABLE: " + table);
        document.getElementById(divId).innerHTML = table;

    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}