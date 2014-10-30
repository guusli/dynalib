'use strict';

angular.module('dynalibraryApp')
  .factory('auth', function ($http, $window, session) {
    return {
      getLoggedInUser: function() {
        return $http.get('auth/loggedIn');
      },
      isLoggedIn: function() {
        if(session.getUser()) {
          return session.getUser().hasOwnProperty('_id');
        } else if($window.sessionStorage.user) {
          return $window.sessionStorage.user.hasOwnProperty('_id');
        } else {
          return false;
        }
      }
    };
  });
