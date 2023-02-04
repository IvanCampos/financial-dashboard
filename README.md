# Financial Dashboard

Built with:
* WebSockets
* Fear and Greed Index
* @YahooFinance 
* @ApacheECharts (@Tesla Supercharger Locations)
* JS/CSS/HTML 
* @GitHub Pages

## YAHOO FINANCE API CALL MUST ORIGINATE FROM A SERVER
Create your own Lambda function to avoid CORS for Yahoo Finance Calls
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

