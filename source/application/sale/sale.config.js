angular.module('LuckyStore')
  .config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/sale',{
        templateUrl: '/partials/sale.html',
        controller:  'SaleCtrl'
      })
}])
