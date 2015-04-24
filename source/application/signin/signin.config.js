angular.module('LuckyStore')
  .config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/signin',{
        templateUrl: '/partials/login.html',
        controller:  'LoginCtrl'
      })
}])
