'use strict';

angular.module('dynalibraryApp')
  .service('session', function () {
  this.create = function (user) {
    this.user = user;
  };
  this.destroy = function () {
    this.user = null;
  };
  this.getUser = function() {
  	return this.user;
  }

});
