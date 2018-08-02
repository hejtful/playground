'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  name: {
    type: String,
    required: 'Provide your name'
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
})

module.exports = mongoose.model('Order', OrderSchema);
