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