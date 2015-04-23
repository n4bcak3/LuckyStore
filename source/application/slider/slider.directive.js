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

