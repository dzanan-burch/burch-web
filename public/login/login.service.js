app.factory('Login',function($http){
    return {
        login:function(username, password) {
            return $http.post('/user/login', {username: username, password: password});
        }
    };
});