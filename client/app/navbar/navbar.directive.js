'use strict';

angular.module('dynalibraryApp')
  .directive('navbar', function ($window, auth, session) {
    return {
      templateUrl: 'app/navbar/navbar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

          scope.isLoggedIn = auth.isLoggedIn();
          scope.username = session.user.name;

        scope.login = function() {
          $window.location.href = '/auth';
        };

        scope.logout = function() {
          $window.location.href = '/auth/logout';
        };
      }
    };
  });