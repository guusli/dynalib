'use strict';

angular.module('dynalibraryApp')
  .factory('userService', function ($http, $window, session) {
    
    var userService = {};


    userService.getUser = function(id) {
      return $http.get('/api/users/' + id );
    };

    userService.getCurrentUser = function() {
      return $http.get('/api/users/me');
    };
    return userService;

  });
