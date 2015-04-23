console.log('Lucky Store');

angular.module('LuckyStore',[
    'ngRoute',
    'ngAnimate'
  ])
  
.config(['$routeProvider', '$locationProvider',
  function($routeProvider,$locationProvider){
    $routeProvider
      .otherwise({
        redirectTo :'/'
      })
      .when('/',{
        templateUrl: '/partials/home.html',
        controller:  ['$scope', 
          function($scope){
          
          }
        ]
      })
    $locationProvider.html5Mode(true);
}])