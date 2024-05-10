const express = require('express');

const sbaActuator = require('spring-boot-admin-actuator');
const cors = require('cors');
const documentScannerApp = express();
const wireMeApp = express();
const faceCaptureApp = express();
const fingerprintApp = express();

documentScannerApp.use(cors());
wireMeApp.use(cors());
faceCaptureApp.use(cors());
fingerprintApp.use(cors());

const documentScannerRouter = require('./routes/document_scanner_route');
const paymentRouter = require('./routes/payment_route');
const faceScannerRouter = require('./routes/face_scanner_route');
const fingerPrintRouter = require('./routes/fingerprint_route');

documentScannerApp.use('/',documentScannerRouter);
wireMeApp.use('/',paymentRouter);
faceCaptureApp.use('/',faceScannerRouter);
fingerprintApp.use('/',fingerPrintRouter);

const springAdmin = (name, port, routeMid) => {
	const options = {
		config: {
		  logFileAddr: '',
		  ipAddr: '192.168.8.100',
		  port: port
		},
	};
	
	routeMid.use(sbaActuator(options));

	const postData = JSON.stringify({
		name: name,
		managementUrl: "http://192.168.8.100:" + port,
		healthUrl: "http://192.168.8.100:" + port + "/actuator/health",
		serviceUrl: "https://apidevinternal.onsys.com.au/api/v1/device-management-service/global/device-status/instances",
		metadata: {
			"preferIp": "true"
		}
	  });
	
	fetch('https://apidevinternal.onsys.com.au/api/v1/device-management-service/global/device-status/instances', {
		method: 'POST',
		body: postData,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			"uuid": "nnn",
			"orgId": "nnn",
			"branchId": "nnn",
			"userId": "nnn",
			"entityId": "!",
			"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1bjZ0OWNFSG0td0syZHNmVmhOVWZWV2dNQVJDNWhNTlBXYnZtQWplU1dVIn0.eyJleHAiOjE3MTUzNjY2NjUsImlhdCI6MTcxNTM2NDg2NSwianRpIjoiZGU3N2FlOWMtNzZkMS00ZjM2LWJhOWQtYjA0ZjBiZmYxZDhhIiwiaXNzIjoiaHR0cHM6Ly8xMC4xMC4xLjE0Ojg0NDMvcmVhbG1zL2lkcC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMGE2NjQ0OTctM2I1Ni00ZmMwLTlmNjgtMzE4MTllM2E4MzFhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaWRwLWFkbWluLWFwaXMiLCJzZXNzaW9uX3N0YXRlIjoiODFhMGM0MjYtOTcyYi00YzNiLTg3YWItODAxMTlkZjkzNTBkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pZHAtcmVhbG0tZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImlkcC1hZG1pbi1hcGlzIjp7InJvbGVzIjpbIm1hc3Rlci1hZG1pbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiODFhMGM0MjYtOTcyYi00YzNiLTg3YWItODAxMTlkZjkzNTBkIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiIxIERpc2FuYXlha2EiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzdXBlcnVzZXIiLCJnaXZlbl9uYW1lIjoiMSIsImZhbWlseV9uYW1lIjoiRGlzYW5heWFrYSIsImVtYWlsIjoiZW5pY3N1cGVydXNlckBvbnN5cy5jb20ifQ.HtNaJD4uLUl35QPXgBISh9bMyJ92eiChZ4D-0CkHxwpXAQi7CBUrTaSbyIyMULa7f78ayrNTI9mr6CcHbS4nRWK-8SoOOVfgD8y9ggkCHinBqlUgmfeFn95I7lEMFvQhw6s6ybB5CZAhxLP0qaKlLRJt-wexTA9T1mawNohPivd2wx2JvI8_WVk54p843SqEkVZhdwGwxfdB0p71CRH498awXnw_F6ljWJ4avx556o34Zz2imUZyqAWCKB_N5sCeaXxWVBFoNC3Sahz85QiWWcaqozOeNKahN7CNFqYHn4w0xSV7Q-8XfRqJMJMe0ukCQtaKrWEVZgoMjjEWUMBhMA"
		}
		})
	  .then((response) => response.json())
	  .then((json) => console.log(json));
}

// Document scan
documentScannerApp.listen(8081, function () {
	springAdmin("HO_DocumentScanner", 8081, documentScannerApp)
	console.log('Document Scanner is listening on port 8081')
});
// // Payment
// wireMeApp.listen(8082, function () {
// 	springAdmin("HO_Wireme", 8082, wireMeApp)
//   	console.log('Wireme is listening on port 8082')
// });
// // Face capture
// faceCaptureApp.listen(8083, function () {
// 	springAdmin("HO_FaceCaptureScanner", 8083, faceCaptureApp)
//   	console.log('Face capture is listening on port 8083')
// });
// // Fingerprint
// fingerprintApp.listen(8084, function () {
// 	springAdmin("HO_FingerPrintScanner", 8084, fingerprintApp)
//   	console.log('Fingerprint is listening on port 8084')
// });
