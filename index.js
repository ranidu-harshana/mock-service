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
		  ipAddr: 'https://ms-23-1ff375b89415.herokuapp.com/',
		  port: port
		},
	};
	
	routeMid.use(sbaActuator(options));

	const postData = JSON.stringify({
		name: name,
		managementUrl: "",
		healthUrl: "https://ms-23-1ff375b89415.herokuapp.com/actuator/health",
		serviceUrl: "",
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
			"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1bjZ0OWNFSG0td0syZHNmVmhOVWZWV2dNQVJDNWhNTlBXYnZtQWplU1dVIn0.eyJleHAiOjE3MTUzNzE2ODYsImlhdCI6MTcxNTM2OTg4NiwianRpIjoiMmRhZDdjZmQtMWNhZS00M2E3LWJmZWYtZTk4YjkwNzJkY2JhIiwiaXNzIjoiaHR0cHM6Ly8xMC4xMC4xLjE0Ojg0NDMvcmVhbG1zL2lkcC1yZWFsbS1kZXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMGE2NjQ0OTctM2I1Ni00ZmMwLTlmNjgtMzE4MTllM2E4MzFhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiaWRwLWFkbWluLWFwaXMiLCJzZXNzaW9uX3N0YXRlIjoiODk5M2Q3YjUtZjc0Yy00MzY4LTg3MGMtYWM2NjNmOGYzYzhlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pZHAtcmVhbG0tZGV2Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImlkcC1hZG1pbi1hcGlzIjp7InJvbGVzIjpbIm1hc3Rlci1hZG1pbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiODk5M2Q3YjUtZjc0Yy00MzY4LTg3MGMtYWM2NjNmOGYzYzhlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiIxIERpc2FuYXlha2EiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzdXBlcnVzZXIiLCJnaXZlbl9uYW1lIjoiMSIsImZhbWlseV9uYW1lIjoiRGlzYW5heWFrYSIsImVtYWlsIjoiZW5pY3N1cGVydXNlckBvbnN5cy5jb20ifQ.QWIGLEuVYwjStSTgsF1sfspj7qMTUewsL3LNPMf-3nt6XzFLUqcQ16lOUg_vDLnSGHT8NImBD02Wd25D5iT4xLnS92b_5nogVQK16dXOHL4WJKC9InKESnyLp_-k6diXPQJ4yS11VdQfXsei-4JkLIMO7Aqi3GsITbm0JuA2nCU1zq7GePaR4izdmjw0tWtztqYAUbgkp5bl8c3awlilrErzzPlRCRtoWR1dx3mq5-sBjWuaknTMy4rt8Egk0npWpfrOGbYun5j59bj_e5kBGNirJL6dd6_j7_J8KP76rBsv6h7VU6qhPXkp3MQSmWRr4iyIb0jN8mCZ_tblI5y5TQ"
		}
		})
	  .then((response) => response.json())
	  .then((json) => console.log(json));
}

const port = process.env.PORT || 8081

// Document scan
documentScannerApp.listen(port, function () {
	springAdmin("HO_DocumentScanner", port, documentScannerApp)
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
