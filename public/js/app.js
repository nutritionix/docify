'use strict';


// // Declare app level module which depends on filters, and services
// angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
//   config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//     $routeProvider.when('/view1', {templateUrl: 'partials/partial1', controller: MyCtrl1});
//     $routeProvider.when('/view2', {templateUrl: 'partials/partial2', controller: MyCtrl2});
//     $routeProvider.otherwise({redirectTo: '/view1'});
//     $locationProvider.html5Mode(true);
//   }]);


// Declare app level module which depends on filters, and services

angular.module('SharedServices', [])
    .config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
        var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            $('.ajax-loader').fadeIn();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    })
// register the interceptor as a service, intercepts ALL angular ajax http calls
    .factory('myHttpInterceptor', function ($q, $window) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                $('.ajax-loader').fadeOut();
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                $('.ajax-loader').fadeIn();
                return $q.reject(response);
            });
        };
    })
angular.module('docBuilder', ['docBuilder.filters', 'docBuilder.services', 'docBuilder.directives', 'SharedServices']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/resource', {
        templateUrl: 'partials/apiExample',
        controller: ResourceCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);