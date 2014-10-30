'use strict';

ddescribe('Controller: UserLoansCtrl', function () {

  // load the controller's module
  beforeEach(module('dynalibraryApp'));

  var BookdetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, auth) {
    scope = $rootScope.$new();
    BookdetailsCtrl = $controller('UserLoansCtrl', {
      $scope: scope
    });
  }));

});
