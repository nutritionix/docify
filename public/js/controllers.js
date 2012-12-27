'use strict';

// /* Controllers */

// function AppCtrl($scope, $http) {
//   $http({method: 'GET', url: '/api/name'}).
//   success(function(data, status, headers, config) {
//     $scope.name = data.name;
//   }).
//   error(function(data, status, headers, config) {
//     $scope.name = 'Error!'
//   });
// }

// function MyCtrl1() {}
// MyCtrl1.$inject = [];


// function MyCtrl2() {
// }
// MyCtrl2.$inject = [];

function NavCtrl($scope, $http) {
  $http.get('/api/resources').
    success(function(data, status, headers, config) {
      $scope.apiResources = data;
    });
}

function apiAccessCtrl($scope) {
  var s = $scope;
  s.appId	 = '';
  s.appKey = '';
}

function IndexCtrl($scope, $http) {
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}






function ResourceCtrl($scope, $http) {
  var s = $scope;
  s.errorInfo = function (resText) {
  	// console.log(resText)
  	// $('div#error_container').html('<div class="alert alert-block alert-error fade in"><button type="button" class="close" data-dismiss="alert">×</button><h4 class="alert-heading">' + resText.STATS +'</h4><p>' + resText.MESSAGE + '</p></div>');
  };

  s.apiRequest = function(){
		s.apiParams = {
			"params":{
				"protocol": "http",
				"host" 		: "devapi.nutritionix.com",
				"pathname": "/v1/api/item/",
				"query":{
						"query"	: "cheese",
						"appKey": document.getElementById('appKey').getAttribute('data-app-key'),
						"appId" : document.getElementById('appId').getAttribute('data-app-id')
				},
				"port"		: 80,
				"method"	: "GET"
			}	
		};
		
		var urlEncondedParams = $.param(s.apiParams);
		// console.log(s.apiParams.params.query.appKey)	
		// console.log(s.apiParams.params.query.appId)
		// console.log(urlEncondedParams)


		// code section AJAX Load file contents
		$("#code").hide('fast');
		$('.ajax-loader').fadeIn();
		$("#code").load('/api/apiExample?' + urlEncondedParams, function(resText, textStatus, XMLHttpRequest) {
			if (resText.STATUS != 200) {
				s.errorInfo(resText);
			};

			//when load is complete prettify
			prettyPrint();

			$('.ajax-loader').fadeOut();
			$('#code').show('normal');
		//animate code block
		});
	};

}








//EXAMPLE CONTROLLERS
// function AddPostCtrl($scope, $http, $location) {
//   $scope.form = {};
//   $scope.submitPost = function () {
//     $http.post('/api/post', $scope.form).
//       success(function(data) {
//         $location.path('/');
//       });
//   };
// }
 
// function ReadPostCtrl($scope, $http, $routeParams) {
//   $http.get('/api/post/' + $routeParams.id).
//     success(function(data) {
//       $scope.post = data.post;
//     });
// }
 
// function EditPostCtrl($scope, $http, $location, $routeParams) {
//   $scope.form = {};
//   $http.get('/api/post/' + $routeParams.id).
//     success(function(data) {
//       $scope.form = data.post;
//     });
    
//   $scope.editPost = function () {
//     $http.put('/api/post/' + $routeParams.id, $scope.form).
//       success(function(data) {
//         $location.url('/readPost/' + $routeParams.id);
//       });
//   };
// }
 
// function DeletePostCtrl($scope, $http, $location, $routeParams) {
//   $http.get('/api/post/' + $routeParams.id).
//     success(function(data) {
//       $scope.post = data.post;
//     });
    
//   $scope.deletePost = function () {
//     $http.delete('/api/post/' + $routeParams.id).
//       success(function(data) {
//         $location.url('/');
//       });
//   };
  
//   $scope.home = function () {
//     $location.url('/');
//   };
// }