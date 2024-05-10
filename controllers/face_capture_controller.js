const faceScanner = require('../responses/face_capture/face_scanner_response.json');

exports.getFaceScanners = function (req, res, next) {
    res.json(faceScanner);
    next();
}