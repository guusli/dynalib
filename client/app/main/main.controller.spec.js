'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dynalibraryApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope, auth) {

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });

  }));

  it('should attach a list of things to the scope', function () {
    expect(scope.books.length).toBe(4);
  });
});
