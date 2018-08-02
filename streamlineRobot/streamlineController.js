'use strict'
const mongoose = require('mongoose')
const Order = mongoose.model('Order')

exports.listAllOrders = (req, res) => {
  Order.find({}, (err, order) => {
    if (err)
      res.send(err)
    res.json(order)
  })
}

exports.createAnOrder = (req, res) => {
  const newOrder = new Order(req.body)
  newOrder.save((err, order) => {
    if (err)
      res.send(err)
    res.json(order)
  })
}

exports.readAnOrder = (req, res) => {
  newOrder.findById(req.params.orderId, (err, order) => {
    if (err)
      res.send(err)
    res.json(order)
  })
}

exports.updateAnOrder = (req, res) => {
  const conditions = { _id: req.params.taskId }
  const options = { new: true }
  newOrder.findOneAndUpdate(conditions, req.body, options, (err, order) => {
    if (err)
      res.send(err)
    res.json(order)
  })
}

exports.deleteAnOrder = (req, res) => {
  const conditions = { _id: req.params.taskId }
  const message = { message: 'Task successfully deleted' }
  newOrder.remove(conditions, err => {
    if (err)
      res.send(err)
    res.json(message)
  })
}
