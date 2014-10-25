'use strict';

describe('Controller: BookdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('dynalibraryApp'));

  var BookdetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookdetailsCtrl = $controller('BookdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
