'use strict';

angular.module('dynalibraryApp')
  .factory('auth', function ($http) {
    return {
      getLoggedInUser: function() {
        return $http.get('auth/loggedIn');
      }
    };
  });
