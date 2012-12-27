var params = {
	"host" 		: "devapi.nutritionix.com",
	"path" 		: "/v1/api/item/",
	"query"		: "cheese"
	"appId" 	: "4937ead8",
	"appKey"	: "e783399958d4261be6ac582c8596bd23",
	"port"		: 80,
	"method"	: "GET",
}


// Parse a JSON object
// into a QUERY
// P = PARAMS
function encodeParams(p, callBack){
	// def prop count
	var constructedURL = "";

	// loop through properties
	for (key in params) {
		
		// console.log(key)
		// console.log(p[key])

		if (key == "query" || key == "method" || key == "port") {
			// console.log("found stuff")
		}
		else{
			constructedURL = constructedURL + key
		};


	};

	callBack(constructedURL);
}

encodeParams(params, function(url) {
	console.log(url);
});