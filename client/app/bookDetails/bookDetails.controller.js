'use strict';

angular.module('dynalibraryApp')
.controller('BookdetailsCtrl', function ($scope, $routeParams, $http, auth, session, bookService) {

  var updateIsLoaner = function() {
    var loanerNames = _.pluck($scope.book.loaners,'name');
      $scope.isLoaner = _.contains(loanerNames, session.getUser().name);
  }


  $scope.init = function() {
    $scope.isLoggedIn = auth.isLoggedIn();

    bookService.getBook($routeParams.id)
    .success(function(data) {
      $scope.book = data;
      $scope.book.numberAvailable = $scope.book.numberInStock - $scope.book.loaners.length;
      $scope.isLoaner = _.contains(_.pluck($scope.book.loaners,'name'),
        session.getUser().name);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.lendBook = function() {

    bookService.lendBook($routeParams.id)
    .success(function(loaner) {
      $scope.book.loaners.push(loaner);

      updateIsLoaner();
      $scope.book.numberAvailable = $scope.book.numberInStock - $scope.book.loaners.length;

    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.returnBook = function() {

    bookService.returnBook($routeParams.id)
    .success(function(loaner) {
      var loanerIds = _.pluck($scope.book.loaners,'_id');
      var indexToRemove = loanerIds.indexOf(loaner._id);
      $scope.book.loaners.splice(indexToRemove, 1);

      updateIsLoaner();
      $scope.book.numberAvailable = $scope.book.numberInStock - $scope.book.loaners.length;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.init();


});
