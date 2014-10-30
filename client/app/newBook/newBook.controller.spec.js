'use strict';

describe('Controller: NewbookCtrl', function () {

  // load the controller's module
  beforeEach(module('dynalibraryApp'));

  var NewbookCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewbookCtrl = $controller('NewbookCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
