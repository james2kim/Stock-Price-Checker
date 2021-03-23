const mongoose = require ('mongoose')

const stockSchema = new mongoose.Schema({
    code: {
        type:String
    },
    likes: {
        type:[String],
        default: []
    },
    price :{
        type:Number
    }
})


const Stock = mongoose.model('stocks', stockSchema)

module.exports = Stock