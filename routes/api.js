'use strict';
const Stock = require ('../models/Stock')
const axios = require('axios')

const saveStock = async (code, like, ip) => {
  const stock = await Stock.findOne({code})
  try {
    if (!stock) {
      let newStock = new Stock({code, likes:like? [ip] : []})
      return await newStock.save()
    } else {
      if (like && stock.likes.indexOf(ip) === -1) {
        stock.likes.push(ip)
      }
      return await stock.save()
    }
    
  } catch (err) {
    console.log(err)
  }
}

function parseData(data) {
  let i = 0
  let stockData = []
  let likes = []
  while (i < data.length) {
    let stock = { stock: data[i].code, price: data[i+1].data.close }
    likes.push(data[i].likes.length)
    stockData.push(stock)
    i += 2
  }

  if (likes.length > 1) {
    stockData[0].rel_likes = likes[0] - likes[1]
    stockData[1].rel_likes = likes[1] - likes[0]
  } else {
    stockData[0].likes = likes[0]
    stockData = stockData[0]
  }
  return stockData
}



module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
        const ip = req.ip
        let code = req.query.stock 

        if (!Array.isArray(code)) {
          code = [code]
        }
        let promises = []
        code.forEach(async code => {
          promises.push(saveStock(code.toUpperCase(), req.query.like, req.ip))
          let url = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${code.toUpperCase()}/quote`
          promises.push(axios.get(url))
        })

        let data = await Promise.all(promises)
        let stockData = parseData(data)
        res.json({stockData})
    });
};
