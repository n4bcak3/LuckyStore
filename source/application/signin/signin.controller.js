angular.module('LuckyStore')

.controller('LoginCtrl', ['$scope','AuthService', function ($scope,AuthService) {
  $scope.user = {};
  $scope.status = 'Login';
  console.log('LoginCtrl init');

  $scope.login = function (form) {
    if (!form.$valid)
      return

    console.log('user %o trying to login', $scope.user);
    $scope.status = 'Loading...';
    // auth service
    
    AuthService.login($scope.user)
      .then(function(auth){
        // success auth event
        $scope.status = "Success";
        console.log(auth);
      },function(err){
        // error 
        $scope.status = "Failed";
        console.log(err);
      });
  }
}])