'use strict';
(function() {
  var resolve =  {
      books: function ($http) {
        return $http.get('/api/books').then (function (resp) {
                   return resp.data;
               });
      }
  };

  angular.module('dynalibraryApp')
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl',
      resolve: resolve
      }
    );
  });
})();