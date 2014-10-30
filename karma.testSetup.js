(function() {
  var injector = angular.injector(['ng']);
  var $q = injector.get("$q");
  var $rootScope = injector.get("$rootScope");

  this.spyOnPromise = function(service, functionName, data) {
    var deferred = $q.defer();
    var spy = spyOn(service, functionName).andReturn(deferred.promise);

    deferred.promise.success = function (value) {
        deferred.resolve(value);
        value(data);
        $rootScope.$apply();
        return deferred.promise;
     };
    deferred.promise.error = function (value) {
        deferred.reject(value);
      	$rootScope.$apply();
      	return spy;
    };
    spy.andResolveWith = function(value) {
      deferred.resolve(value);
      $rootScope.$apply();
      return spy;
    };
    spy.andRejectWith = function(value) {
      deferred.reject(value);
      $rootScope.$apply();
      return spy;
    };
    return spy;
  };

  this.testBook = {"title": "MongoDB Book", "ISBN": "1", 
  					"_id": "544f86a9d40bd2713459774c", "__v": 0, "loaners": [] };

  this.testUser = {"__v": 0, "_id": "544f86a9d40bd2713459774b",
  					 "googleId": "104788871386310670334", "name": "Test User", "loans": ["544f86a9d40bd2713459774c"] };

  this.session = { 
      user: {
        name : "Test User"
      }
    };


}).call(this);