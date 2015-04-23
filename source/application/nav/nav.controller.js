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