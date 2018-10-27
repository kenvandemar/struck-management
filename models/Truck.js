var mongoose = require('mongoose')

var TruckSchema = new mongoose.Schema({
    truckPlate: String,
    cargoType: String,
    driver: String,
    truckType: String,
    price: Number,
    dimension: String,
    parkingAddress: String,
    productionYear: String,
    status: String,
    description: String,
    publishedAt: { type: Date },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Truck', TruckSchema) 