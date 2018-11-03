var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
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
            console.log('server product = ' + JSON.stringify(truck));
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
router.get("/search", function(req, res, next){
    var q = req.query.q
        Truck.find({
            $text: {
                $search: new RegExp(q)
            }
        }, function(err, data) {
            if (err) return next(err)
            res.json(data)
        }
    )
});

// FILTER TRUCK ACCORDING STATUS
router.get("/search/filter", function(req, res, next) {
    var status = req.query.f
    Truck.find({
        status: new RegExp(status)
    }, function(err, data) {
        if (err) return next(err)
        res.json(data)
    })
})

// SORT PRICE
router.get("/search/price", function(req, res, next) {
    Truck.find({}).sort(req.query.sort).exec(function(err, listings) {
        if (err) return next(err)
        res.json(listings)
    })
})
module.exports = router