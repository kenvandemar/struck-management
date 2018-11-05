var express = require('express')
var router = express.Router()
var Truck = require('../models/Truck')

// GET ALL TRUCKS
router.get('/trucks', function(req, res, next) {
    Truck.find(function (err, trucks) {
        if (err) return next(err)
        return res.json(trucks)
    })
})

// PAGINITION
router.get('/trucks/:page', function(req, res, next) {
    var perPage = 10
    var page = req.params.page || 1
    Truck.find({})
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .exec(function(err, trucks) {
            Truck.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                return res.json({
                    trucks,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
          })
})

// GET SINGLE TRUCK BY ID
router.get('/trucks/:page/:id', function(req, res, next) {
    Truck.findById(req.params.id)
    .exec(function (err, truck) {
        if (err) {
            console.error('Error retrieving all product by id!');
        } else {
            res.json(truck);
        }
    })
})

// SAVE TRUCK
router.post('/trucks', function(req, res, next) {
    Truck.create(req.body, function(err, truck) {
        if (err) return next (err)
        res.json(truck)
    })
})

// UPDATE BOOK
router.put('/trucks/:id', function(req, res, next) {
    Truck.findByIdAndUpdate(req.params.id, req.body, function(err, truck) {
        if (err) return next(err)
        res.json(truck)
    })
})

// DELETE BOOK
router.delete('/trucks/:page/:id', function(req, res, next) {
    Truck.findByIdAndRemove(req.params.id, req.body, function(err, truck) {
        if (err) return next(err)
        res.json(truck)
    })
})

// SEARCH TRUCK
router.get("/search/:page", function(req, res, next) {
    var q = req.query.q
    var perPage = 10
    var page = req.params.page || 1
    
    Truck.aggregate([
        { "$match": { "$text": { "$search": q }}},
        { "$group": {
            "_id": null,
            "trucks": {  
                "$push": {
                    "_id": "$_id",
                    "truckPlate": "$truckPlate",
                    "cargoType": "$cargoType",
                    "driver": "$driver",
                    "truckType": "$truckType",
                    "price": "$price",
                    "dimension": "$dimension",
                    "parkingAddress": "$parkingAddress",
                    "productionYear": "$productionYear",
                    "status": "$status",
                    "description": "$description",
                    "publishedAt": "$publishedAt",
                    "updatedAt": "$updatedAt",
                }
            },
            "Total_Results": { "$sum": 1 },
        }},
        { "$unwind": "$trucks"},
        { "$skip": (perPage * page) - perPage},
        { "$limit": perPage},
        { "$group": {
            "_id": null,
            "trucks": { "$push": "$trucks" },
            "pages": { "$first": {"$ceil": {"$divide": ["$Total_Results", perPage]} }},
        }}
    ])
    .exec(function(err, trucks) {
        if (err) return next(err)
        res.json({
            trucks: trucks[0],
            current: page,
        })
    })
})

// FILTER TRUCK ACCORDING STATUS
router.get("/search/filter/:page", function(req, res, next) {
    var status = req.query.f
    var perPage = 10
    var page = req.params.page || 1


    Truck.aggregate([
        { "$match": { "status": status }},
        { "$group": {
            "_id": null,
            "trucks": {
                "$push": {
                    "_id": "$_id",
                    "truckPlate": "$truckPlate",
                    "cargoType": "$cargoType",
                    "driver": "$driver",
                    "truckType": "$truckType",
                    "price": "$price",
                    "dimension": "$dimension",
                    "parkingAddress": "$parkingAddress",
                    "productionYear": "$productionYear",
                    "status": "$status",
                    "description": "$description",
                    "publishedAt": "$publishedAt",
                    "updatedAt": "$updatedAt",
                }
            },
            "Total_Results": { "$sum": 1 },
        }},
        { "$unwind": "$trucks"},
        { "$skip": (perPage * page) - perPage},
        { "$limit": perPage},
        { "$group": {
            "_id": null,
            "trucks": { "$push": "$trucks" },
            "pages": { "$first": {"$ceil": {"$divide": ["$Total_Results", perPage]} }},
        }}
    ])
    .exec(function(err, trucks) {
        if (err) return next(err)
        res.json({
            trucks: trucks[0],
            current: page,
        })
    })
})

// SORT PRICE
router.get("/search/price/:page", function(req, res, next) {
    var perPage = 10
    var page = req.params.page || 1
    Truck.find({})
        .sort(req.query.sort)
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, trucks) {
            Truck.countDocuments().exec(function(err, count) {
                if (err) return next(err)
                return res.json({
                    trucks,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})
module.exports = router