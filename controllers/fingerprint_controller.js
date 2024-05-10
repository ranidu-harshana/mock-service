const fingerPrintDevice = require('../responses/finger_print/fingerprint_device_C8R1HQ04270_reponse.json');
const fingerPrintDeviceList = require('../responses/finger_print/fingerprint_device_list_response.json');
const fingerPrint = require('../responses/finger_print/fingerprint_response.json');

exports.getFingerPrintDevice = function (req, res, next) {
    res.json(fingerPrintDevice);
    next();
}

exports.getFingerPrintDeviceList = function (req, res, next) {
    res.json(fingerPrintDeviceList);
    next();
}

exports.addFingerPrint = function (req, res, next) {
    res.json(fingerPrint);
    next();
}