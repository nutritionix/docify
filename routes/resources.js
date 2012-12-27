// var Db = require('mongodb').Db, 
// 		Connection = require('mongodb').Connection,
// 		Server = require('mongodb').Server,
// 		format = require('util').format;

// var db_host = 'JamesQualls:vbnvbn45@ds045297.mongolab.com';
// var db_port = 45297;
// var db_name = 'docbuilder';



// // API REQUEST
// exports.data = function (req, res) {
// 	console.log("Connecting to " + db_host + ":" + db_port);
// 	Db.connect(format("mongodb://%s:%s/%s?w=1", db_host, db_port, db_name), function(err, db) {
// 		db.collection('resources', function(err, collection) {
// 			// Query collection and add all docs to array
// 			collection.find().toArray(function(err, docs) {
// 			  var resources = docs;
// 			  //Close DB connection
// 				db.close();
// 				//respond with resources from MongoDB
// 				res.json(resources);
// 			});

// 		});
// 	});
// };


// // exports.data = function (req, res) {
// // 	res.json({"nope":"couldnt do it"});
// // };

/*
*	Use the above code
* to connect to MongoDB collections
* and then return your own API response
**********/

var fs = require('fs');

exports.data = function (req, res) {
	fs.readFile('config/resources.json', 'utf8', function (err, data) {
  	if (err) throw err;
  	var resources = JSON.parse(data); 
  	res.json(resources);
	});
};