const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Order = require('./streamlineModel')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/Orderdb')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./streamlineRoutes')
routes(app)

app.listen(port)

console.log('streamline server started on: ' + port)
