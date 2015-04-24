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