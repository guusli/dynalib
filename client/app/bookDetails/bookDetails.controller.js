'use strict';

angular.module('dynalibraryApp')
  .controller('BookdetailsCtrl', function ($scope, $routeParams, $http, auth) {

    $scope.isLoggedIn = auth.isLoggedIn();

    $http.get('/api/books/' + $routeParams.id )
        .success(function(data) {
            $scope.book = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  });
