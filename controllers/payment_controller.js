const lastPayment = require('../responses/wireme/payment_last_response.json');
const payment = require('../responses/wireme/payment_response.json');

exports.getLastPayment = function (req, res, next) {
    res.json(lastPayment);
    next();
}

exports.addPayment = function (req, res, next) {
    res.json(payment);
    next();
}