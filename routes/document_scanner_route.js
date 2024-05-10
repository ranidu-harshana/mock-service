const express = require('express');
const router = express.Router();

const documentScannerController =require('../controllers/document_scanner_controller');

router.get('/api/v1/scanners',documentScannerController.getDocumentScannerList);
router.get('/api/v1/scan',documentScannerController.getScannedDocumentList);

module.exports = router;