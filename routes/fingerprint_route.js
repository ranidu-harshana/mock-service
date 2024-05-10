const express = require('express');
const router = express.Router();

const fingerPrintController =require('../controllers/fingerprint_controller');

router.get('/device/C8R1HQ04270',fingerPrintController.getFingerPrintDevice);
router.get('/device/list',fingerPrintController.getFingerPrintDeviceList);
router.post('/fingerprint',fingerPrintController.addFingerPrint);

module.exports = router;