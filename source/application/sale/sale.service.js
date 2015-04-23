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