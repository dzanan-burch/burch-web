app.factory('Register',function($http){
    return {
        add:function(name, username, password) {
            return $http.post('/user/register', {name: name, username: username, password: password});
        }
    };
});