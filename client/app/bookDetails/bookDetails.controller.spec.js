'use strict';

ddescribe('Controller: BookdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('dynalibraryApp'));

  var BookdetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, auth) {
    spyOn(auth, 'isLoggedIn');
    scope = $rootScope.$new();
    BookdetailsCtrl = $controller('BookdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should get book details', inject(function (bookService, $routeParams, $q) {
    var succeedPromise;
    spyOn(bookService, "getBook")
    .andCallFake(function(){
      if (succeedPromise) {
        return $q.when(function(){});
      }
      else{
        return $q.reject("Something went wrong");
      }
    });
    succeedPromise = true;
    //scope.$digest();
    scope.init();
    expect(bookService.getBook).toHaveBeenCalledWith($routeParams.id);
  }));

  it("should lend book", inject(function($routeParams, $q, bookService) {

    var mockPromise = function() {
      var deferred = $q.defer();
      deferred.promise.success = function (fn) {
        deferred.promise.then(fn);
        return deferred.promise;
      };
      deferred.promise.error = function (fn) {
        deferred.promise.then(null, fn);
        return deferred.promise;
      };
      deferred.resolve('Remote call result');
      return deferred.promise;
    };

    $routeParams.id = 1;  
    spyOn(bookService, 'lendBook').andCallFake(mockPromise);
    scope.lendBook();
  }));
  

  describe("When ", function() {

  });
});
