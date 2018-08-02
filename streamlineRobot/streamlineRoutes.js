'use strict'
const orderList = require('./streamlineController')

module.exports = app => {
  app.route('/orders')
    .get(orderList.listAllOrders)
    .post(orderList.createAnOrder)

  app.route('/orders/:orderId')
    .get(orderList.readAnOrder)
    .put(orderList.updateAnOrder)
    .delete(orderList.deleteAnOrder)
}
