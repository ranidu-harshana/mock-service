const express = require('express');
const router = express.Router();

const faceScannerController =require('../controllers/face_capture_controller');

router.get('/api/v1/face',faceScannerController.getFaceScanners);

module.exports = router;