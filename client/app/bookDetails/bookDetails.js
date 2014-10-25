'use strict';

angular.module('dynalibraryApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/books/:id', {
        templateUrl: 'app/bookDetails/bookDetails.html',
        controller: 'BookdetailsCtrl'
      });
  });
