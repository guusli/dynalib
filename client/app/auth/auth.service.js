'use strict';

angular.module('dynalibraryApp')
  .factory('auth', function ($http, session) {
    return {
      getLoggedInUser: function() {
        return $http.get('auth/loggedIn');
      },
      isLoggedIn: function() {
        return session.user.hasOwnProperty('_id');
      }
    };
  });
