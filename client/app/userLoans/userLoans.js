'use strict';

(function() {
  var resolve =  {
      user: function ($http, userService, session) {
        return userService.getCurrentUser().then (function (resp) {
                   return resp.data;
               });
      }
  };

angular.module('dynalibraryApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/myLoans', {
        templateUrl: 'app/userLoans/userLoans.html',
        controller: 'UserLoansCtrl',
        resolve: resolve
      });
  });
})();