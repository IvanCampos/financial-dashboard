# Financial Dashboard

### Visual Preview:
<blockquote class="twitter-tweet"><p lang="de" dir="ltr">Dark Mode <a href="https://twitter.com/hashtag/dataviz?src=hash&amp;ref_src=twsrc%5Etfw">#dataviz</a> <a href="https://t.co/LDgqPcwfFj">pic.twitter.com/LDgqPcwfFj</a></p>&mdash; Ivan Campos (@ivancampos) <a href="https://twitter.com/ivancampos/status/1620946560577323008?ref_src=twsrc%5Etfw">February 2, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Built with:
* WebSockets
* Fear and Greed Index
* @YahooFinance **(SEE MESSAGE BELOW)**
* @ApacheECharts
  * @Tesla Supercharger Locations
* JS/CSS/HTML 
* @GitHub Pages
* AWS Lambda **(SEE MESSAGE BELOW)** 

## YAHOO FINANCE API CALL MUST ORIGINATE FROM A SERVER

### THIS IS TO BE CALLED WITHIN /exports/stock.js : getStocks()
How to create your own AWS Lambda function to avoid CORS for Yahoo Finance Calls
```
export const handler = async(event) => {

    const YAHOO_URL = 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=' + 
    'AAPL,TSLA,GOOG,NVDA,NFLX,AMD,AMZN,ARKK,DIS,TEAM,SQ,NKE,BABA,GBTC,ETHE,MSFT,PYPL,BTC-USD,ETH-USD,ADA-USD,SOL-USD,VGX-USD,XTZ-USD,AAVE-USD,UNI3-USD,DOT1-USD,DOGE-USD,MANA-USD,AVAX-USD';
    
    try {
        const response = await fetch(YAHOO_URL);
    
        const data = await response.json();
    
        return {
          statusCode: 200,
          body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
```

