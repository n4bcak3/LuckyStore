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