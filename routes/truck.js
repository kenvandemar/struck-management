var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Truck = require('../models/Truck')

// GET ALL TRUCKS
router.get('/trucks', function(req, res, next) {
    Truck.find(function (err, trucks) {
        if (err) return next(err)
        res.json(trucks)
    })
})

// GET SINGLE TRUCK BY ID
router.get('/:id', function(req, res, next) {
    Truck.findById(req.params.id, function(err, truck) {
        if (err) return next(err)
        res.json(truck)
    })
})

// SAVE TRUCK
router.post('/', function(req, res, next) {
    Truck.create(req.body, function(err, truck) {
        if (err) return next (err)
        res.json(truck)
    })
})

// UPDATE BOOK
router.put('/:id', function(req, res, next) {
    Truck.findByIdAndUpdate(req.params.id, req.body, function(err, truck) {
        if (err) return next(err)
        res.json(truck)
    })
})

// DELETE BOOK
router.delete('/:id', function(req, res, next) {
    Truck.findByIdAndRemove(req.params.id, req.body, function(err, truck) {
        if (err) return next(err)
        res.json(truck)
    })
})

module.exports = router