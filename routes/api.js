/*
 * Serve JSON Data
 */


// Load Dependencies
var fs = require('fs'),
		format = require('util').format,
		http = require('http'),
		url = require('url');






// GET Resources
// Retrieves your Resource Manifest
exports.resources = function (req, res) {
	// Async get data from file
	getData('resources.json', function(data) {
		res.json(data);
	});
};



// POST foreignApiReq
// Takes your API params passed
// Uses Params to make API Req, Res with the JSON Data
//----------------------------------------------------
//!!!! NOTE -- 
// Using this method is secure, the request is made by the server
// and not sent in the clear

exports.foreinApiReq = function (req, res) {
	// Params object
	// Parse Reqest Query
	// create url string, based on params
	var params = req.query.params,
			reqURL = url.format(params);
			// console.log(params)

	//ASYNC MAKE AN API REQUEST using reqURL
	foreignApiRequest(reqURL, function(data) {
		res.json(data)
	});
};










/* ------------------------------------------------ */
//--------------------------------------------------//
// --						ALL API GLOBAL FUNCTIONS 				 -- //
// --																						 -- //
//--------------------------------------------------//
/* ------------------------------------------------ */





// Get File contents of JSON files
// inside Config folder
//
// file contents are then rendered as JSON
/*
**	NOTES
**	Looking to integrated the USE of a DB
*** 
****/
function getData(fileName, success) {

	// Take FileName and ASYNC open
	fs.readFile(format("config/%s", fileName), 'utf8', function (err, data) {
		// If error occurs turn it to JSON
		// Show error
		if (err) {
			var badRequest = JSON.stringify(err);
			console.log(badRequest);
			success(badRequest);
		}
		// If file contents were returned
		// parse it to JSON
		// Show Response
		else if (data) {
			var contents = JSON.parse(data);
			success(contents);
		};
	});

};



/**
**	Make a request to the forien API
**	Then when the request has been completed
**	CallBack the response and Proxy the Response
**
** 	NOTES--------------------------------------
****/
function foreignApiRequest (reqURL, success) {
	var options = url.parse(reqURL, true);
	
	var req = http.request(options, function(res) {
		// console.log('STATUS: ' + res.statusCode);
		// console.log('ReqURL: ' + reqURL);
		// console.log('HEADERS: ' + JSON.stringify(res.headers));
		
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
		
			if (res.statusCode != 200) {
				success({
					"STATUS"	: res.statusCode,
					"HEADERS"	: res.headers,
					"REQ_URL"	: reqURL,
					"MESSAGE" : "This may be due to missing or incorrect athentication information. Check your App ID, and App Key for mistakes"

				});
			}else{
				success(JSON.parse(chunk));
			};
		});

	});

	req.on('error', function(e) {
		success({"error":"contact admin" + e.message});
		console.log('problem with foreinApiReq: ' + e.message);
	});
	
	req.end();

};
































/* ------------------------------------------------ */
//--------------------------------------------------//
// --EXAMPLE OF ALL REQUEST TYPES YOU CAN CREATE -- //
// --FOR YOUR API																 -- //
//--------------------------------------------------//
/* ------------------------------------------------ */

// //get

// exports.posts = function (req, res) {
// 	var posts = [];
	
// 	data.posts.forEach(function(post, i){
// 		posts.push({
// 			id: i,
// 			title: post.title,
// 			text: post.text.substr(0,50) + '...'
// 		});
// 	});
// 	res.json({
// 		posts: posts
// 	});
// };

// exports.post = function (req, res){
// 	var id = req.params.id;
	
// 	if (id >= 0 && id < data.posts.length) {
// 		res.json({
// 			post: data.posts[id]
// 		});
// 	} else {
// 		res.json(false);
// 	};
// };

// // POST
// exports.addPost = function (req, res) {
// 	data.posts.push(req.body);
// 	res.json(req.body);
// };

// // PUT
// exports.editPost = function (req, res) {
// 	var id = req.params.id;

// 	if (id >= 0 && id < data.posts.length) {
// 		data.posts[id] = req.body;
// 		res.json(true);
// 	} else {
// 		res.json(false);
// 	};
// };

// // DELETE
// exports.deletePost = function (req, res) {
// 	var id = req.params.id;

// 	if (id >= 0 && id < data.posts.length) {
// 		data.posts.splice(id, 1);
// 		res.json(true);
// 	} else {
// 		res.json(false);
// 	};
// };