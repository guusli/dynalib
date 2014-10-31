'use strict';

angular.module('dynalibraryApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
  ])
.run(function($rootScope) {
  $rootScope.$on('$viewContentLoaded', function () {
    $(document).foundation();
  });
})
.run(function($window, auth, session){
  if($window.localStorage.redirectUrl) {
    $window.location.pathname = $window.localStorage.redirectUrl;
    $window.localStorage.removeItem('redirectUrl');
  }

  auth.getLoggedInUser().success(function(user) {
    session.create(user);
  });
})
.constant('_', _)

.filter('num', function() {
  return function(input) {
    return parseInt(input, 10);
  }
})

.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
});