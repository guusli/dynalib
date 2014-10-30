'use strict';

angular.module('dynalibraryApp')
  .factory('userService', function ($http, $window, session) {
    
    var userService = {};


    userService.getUser = function(id) {
      return $http.get('/api/users/' + id );
    };

    userService.getCurrentUser = function() {
      var userId;
      if(session.getUser()) {
          userId = session.getUser()._id;
        } else if($window.sessionStorage.user) {
          userId = JSON.parse($window.sessionStorage.user)._id;
        } else {
          return -1;
        }
      return $http.get('/api/users/' + userId );
    };
    return userService;

  });
