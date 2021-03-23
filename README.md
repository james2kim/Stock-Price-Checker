# [Stock Price Checker](https://freecodecamp.org/learn/information-security/information-security-projects/stock-price-checker)

### Protected against Cross Site Scripting Attacks using Helmet.js
### Functional Tests written on Mocha.js framwork using Chai's assertion modules

### Example usage:
/api/stock-prices?stock=GOOG
/api/stock-prices?stock=GOOG&like=true
/api/stock-prices?stock=GOOG&stock=MSFT
/api/stock-prices?stock=GOOG&stock=MSFT&like=true
### Example return:
{"stockData":{"stock":"GOOG","price":786.90,"likes":1}}
{"stockData":[{"stock":"MSFT","price":62.30,"rel_likes":-1},{"stock":"GOOG","price":786.90,"rel_likes":1}]}
