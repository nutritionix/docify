// var fs = require('fs');


// exports.users = function (req, res) {
// 	fs.readFile('config/test.json', 'utf8', function (err, data) {
//   	if (err) throw err;
//   	var jsonData =JSON.parse(data); 
//   	res.json(jsonData);
// 	});
// };




// Comment the above lines
// then uncomment these lines to
// run this test in Node Console without express
// fs.readFile('../config/test.json','utf8', function (err, data) {
//   	if (err) throw err;
//   	var jsonData =JSON.parse(data); 
//   	console.log(jsonData);
// });



// var fs = require('fs'),
// 		format = require('util').format;

// // Function to dynamically get
// // file contents and responde with JSON
// function getData (fileName) {

// 	// Take FileName and ASYNC open
// 	fs.readFile(format("../config/%s", fileName), 'utf8', function (err, data) {
// 		// If error occurs turn it to JSON
// 		// Show error
// 		if (err) {
// 			var badRequest = JSON.stringify(err);
// 			console.log(badRequest);
// 		};
		
// 		// If file contents were returned
// 		// parse it to JSON
// 		// Show Response
// 		if (data) {
// 			var content = JSON.parse(data);
// 			console.log(content);
// 		};
		
		
// 	});

// };

// getData('nothing.json');


















// MAKE HTTP REQUEST TO API SERVER
// PROXY THE RESPONSE




// DEPENDENCIES
var fs = require('fs'),
		http = require('http'),
		url = require('url');

// var urlStr = "devapi.nutritionix.com/v1/api/item/?query=cheese&appId=4937ead8&appKey=e783399958d4261be6ac582c8596bd23";
// console.log(url.parse(urlStr, true))

// Create the Options Object
// for the HTTP REQUEST
// PARAMS OBJECT FOR API REQUEST
var params = {
			"protocol": "http",
			"host" 		: "devapi.nutritionix.com",
			"pathname": "/v1/api/item/",
			"query":{
					"query"	: "cheese",
					"appKey": "e783399958d4261be6ac582c8596bd23",
					"appId" : "4937ead8"
			},
			"port"		: 80,
			"method"	: "GET"
		},
		reqURL = url.format(params); 
// console.log(url.format(params))

/**
**	Make a request to the forien API
**	Then when the request has been completed
**	CallBack the response and Proxy the Response
**
** 	NOTES--------------------------------------
****/
function foreignApiRequest (reqURL, callBack) {

	var options = url.parse(reqURL, true);
	// console.log(options);

	// Start HTTP Client & Pass in Options
	// make API Request with specified params
	var req = http.request(options, function(res) {
		// console.log('STATUS: ' + res.statusCode);
		// console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			callBack(chunk);
		});
	});

	// If there is an error with the
	// request, log it to the console.
	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	// END REQUEST
	req.end();

}


/*MAKING AN API REQUEST*/




// run ASYNC API REQUEST
//
// When the data is returned from
// DISPLAY the data returned from the
// REQUEST

/* FUNCTION 			PARAMS 	CALLBACK
------------------------------------------*/ 
foreignApiRequest(reqURL, function(data) {
	console.log('BODY: ' + data);
});




