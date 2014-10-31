'use strict';

angular.module('dynalibraryApp')
.factory('auth', function ($http, $window, session) {
  var authService = {};

  authService.getLoggedInUser = function() {
    return $http.get('auth/loggedIn');
  },

  authService.isLoggedIn = function() {
    if(session.getUser()) {
      return session.getUser().hasOwnProperty('_id');
    } else {
      return false;
    }
  }
  
  return authService;

});
