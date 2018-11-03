var mongoose = require('mongoose')

var TruckSchema = new mongoose.Schema({
    truckPlate: {type: String, text: true},
    cargoType:  {type: String, text: true},
    driver:  {type: String, text: true},
    truckType:  {type: String, text: true},
    price:  {type: Number, text: true},
    dimension:  {type: String, text: true},
    parkingAddress:  {type: String, text: true},
    productionYear: {type: Number, text: true},
    status:  {type: String, text: true},
    description:  {type: String, text: true},
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    index: { type: Boolean, default: true, required: true },
})

module.exports = mongoose.model('Truck', TruckSchema) 