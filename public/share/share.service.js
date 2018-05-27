app.factory('Share',function($http){
    return {
        get:function(id) {
            return $http.get('/workout/share/' + id);
        },
        add: function(username, name, date) {
            return $http.post('/workout/share', {username: username, name: name, date: date});
        }
    };
});