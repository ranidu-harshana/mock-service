const scannerList = require('../responses/document_scanner/scanner_list_response.json');
const scannedDocumentList = require('../responses/document_scanner/scannedDocumentList.json');

exports.getDocumentScannerList = function (req, res, next) {
    res.json(scannerList);
    next();
}

exports.getScannedDocumentList = function (req, res, next) {
    res.json(scannedDocumentList);
    next();
}