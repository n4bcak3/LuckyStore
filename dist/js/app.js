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
angular.module('LuckyStore')

.service('AuthService', ['$q','$timeout','$http', function($q,$timeout,$http){

  function verifyUser(user,callback){
    var cb = callback || angular.noop;


    if ((user.username == 'admin') && (user.password == 'admin')){
      // success auth
      $http.get('/login_success.json').success(cb);
      return cb;
    } else {
      // failed auth
      $http.get('/login_fail.json').success(cb);
      return cb;
    }
  }

  return {
    login: function(user_entity) {
      var def = $q.defer();
      // console.log('AuthService:',user_entity);

      $timeout(function(){
        verifyUser(user_entity,function(res){
          if (res.error)
            def.reject(res);
          else
            def.resolve(res);
        })
                
      }, 3000);

      return def.promise
    },

    registration: function(user_entity){

    }
  }
}])
angular.module('LuckyStore')

.directive('menu', ['$location',function ($location) {
  return {
    restrict: 'A',
    link: function (scope, elem, attr) {
      console.log('nav init', elem);

      // elem.find('a[ng-href]').filter(function(){
      //   return $(this).attr('ng-href') == $location.path()
      // })
      //   .addClass('active')
    },
    controller: 'NavCtrl'
  };
}])

.controller('NavCtrl', ['$scope','$location', function($scope,$location){

    $scope.isActive = function(elem){
      return elem == $location.path()
    }

}])
angular.module('LuckyStore')
  .config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/sale',{
        templateUrl: '/partials/sale.html',
        controller:  'SaleCtrl'
      })
}])

angular.module('LuckyStore')

.controller('SaleCtrl', ['$scope', 'SaleProduction',
  function($scope,SaleProduction){
    var page = $scope.page = 1;
    var items_on_page = 8;

    // getting first page of sale items
    // counting how much pages we need in pagination
    // ---------------------------------------------
    
    SaleProduction.query(function(data){
      $scope.sale_items = data.slice(0, items_on_page*page);
      $scope.page_lenght = Math.ceil(data.length/items_on_page);
    })

    $scope.changepage = function(p){
      if ($scope.page == p)
        return
      
      if (typeof p == 'number'){        
        $scope.page = p;
      }
      if (typeof p == 'string'){
        if ((p == 'next') && ($scope.page < $scope.page_lenght-1) ){
          $scope.page++;
        } else {
            if ((p == 'back') && ($scope.page > 1)){
              $scope.page--;
            } else {
              return;
            }
          }
      } 



      SaleProduction.query(function(data){
        $scope.sale_items = data.slice(items_on_page*$scope.page, items_on_page*($scope.page+1));
      })

    }

  }
])

.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=1; i<total; i++)
      input.push(i);
    return input;
  };
})
angular.module('LuckyStore')
  
.service('SaleProduction', ['$q','$http',function ($q,$http) {
    

  return {
    query: function(callback){
      $http.get('/sale_items.json').success(
          callback || angular.noop
        )
    }

  }
}])
angular.module('LuckyStore')
  .config(['$routeProvider',
  function($routeProvider){
    $routeProvider
      .when('/signin',{
        templateUrl: '/partials/login.html',
        controller:  'LoginCtrl'
      })
}])

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
angular.module('LuckyStore')

// -----------------------------
// load configuration of sliders
// -----------------------------

.run(['$rootScope', function($rootScope){
  $rootScope.$sliders = {};

  $rootScope.$sliders.adv_slider = {
    dots: true,
    infinite: true,
    speed: 500
  };

  $rootScope.$sliders.topsellers = {
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  
}])
angular.module('LuckyStore')
  .directive('slider', [function () {
    return {
      restrict: 'E',
      scope: {
        config: '@'
      },
      link: function (scope, iElement, iAttrs) {
        var config = scope.$root.$sliders[scope.config];

        console.log('slider config',config);

        // slick slider configuration
        $(iElement).slick(config);
      }
    };
  }])

