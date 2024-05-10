const express = require('express');
const router = express.Router();

const paymentController =require('../controllers/payment_controller');

router.post('/api/v1/payment',paymentController.addPayment);
router.get('/api/v1/payment/lastapi/v1/payment/last',paymentController.getLastPayment);

module.exports = router;