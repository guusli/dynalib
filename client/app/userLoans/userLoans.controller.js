'use strict';

angular.module('dynalibraryApp')
.controller('UserLoansCtrl', function ($scope, $routeParams, $http, auth, session, user, userService) {

  $scope.init = function() {
  	$scope.user = user;
  };


  $scope.init();


});
