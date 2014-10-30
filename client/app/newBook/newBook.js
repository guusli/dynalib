'use strict';

angular.module('dynalibraryApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/newBook', {
        templateUrl: 'app/newBook/newBook.html',
        controller: 'NewbookCtrl'
      });
  });
