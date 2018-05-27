var token = localStorage.getItem('token');
app.factory('Profile',function($http){
    return {
        add:function(user) {
            return $http.post('/user/profile/update', user, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        get:function(username) {
            //var token = localStorage.getItem('token');
            return $http.get('/user/profile/' + username, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        }
    };
});