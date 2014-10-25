'use strict';

angular.module('dynalibraryApp')
  .controller('BookdetailsCtrl', function ($scope, $routeParams, $http) {
    $http.get('/api/books/' + $routeParams.id )
        .success(function(data) {
            $scope.book = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  });
