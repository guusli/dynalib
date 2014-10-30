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

  it('should get book details', inject(function (bookService, $routeParams, $q, session) {
    spyOnPromise(bookService, 'getBook', testBook);
    spyOn(session, 'getUser').andReturn({name: "Test User"});
    scope.init();
    expect(bookService.getBook).toHaveBeenCalledWith($routeParams.id);
  }));

  it("should lend book", inject(function($routeParams, $q, bookService, session) {

    spyOnPromise(bookService, 'lendBook', testUser);
    spyOn(session, 'getUser').andReturn(testUser);
    scope.book = testBook;
    scope.isLoaner = false;

    $routeParams.id = 1;  
    scope.lendBook();
    
    expect(bookService.lendBook).toHaveBeenCalledWith($routeParams.id);
    expect(scope.isLoaner).toBeTruthy();
  }));

  it("should return book", inject(function($routeParams, $q, bookService, session) {

    spyOnPromise(bookService, 'returnBook', testUser);
    spyOn(session, 'getUser').andReturn(testUser);
    scope.book = testBook;
    scope.book.loaners = [testUser];
    scope.isLoaner = true;

    $routeParams.id = 1;  
    scope.returnBook();
    
    expect(bookService.returnBook).toHaveBeenCalledWith($routeParams.id);
    expect(scope.isLoaner).toBeFalsy();
  }));


  

  describe("When ", function() {

  });
});
