'use strict';

angular.module('dynalibraryApp')
  .directive('navbar', function ($window, auth) {
    return {
      templateUrl: 'app/navbar/navbar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        auth.getLoggedInUser().success(function(user) {
          scope.isLoggedIn = user.hasOwnProperty('_id');
          console.log(scope.isLoggedIn);
          scope.username = user.name;
        });

        scope.login = function() {
          $window.location.href = '/auth';
        };

        scope.logout = function() {
          $window.location.href = '/auth/logout';
        };
      }
    };
  });