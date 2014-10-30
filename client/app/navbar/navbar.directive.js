'use strict';

angular.module('dynalibraryApp')
  .directive('navbar', function ($window, $routeParams, auth, session) {
    return {
      templateUrl: 'app/navbar/navbar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

          scope.isLoggedIn = auth.isLoggedIn();
          scope.username = session.user.name;

        scope.login = function() {
          $window.localStorage.redirectUrl = $window.location.pathname;

          $window.location.href = '/auth';
        };

        scope.logout = function() {
          $window.location.href = '/auth/logout';
        };
      }
    };
  });