var token = localStorage.getItem('token');
app.factory('Exercise',function($http){
    return {
        add: function(name, muscle, username) {
            return $http.post('/exercise/add', {name: name, muscle: muscle, username: username}, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        update: function(id, name, muscle) {
            return $http.put('/exercise/update', {_id: id, name: name, muscle: muscle}, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        delete: function(id) {
            return $http.delete('/exercise/delete/' + id, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        get: function() {
            return $http.get('/exercise/get', { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        getById: function(id) {
            return $http.get('/exercise/get/' + id, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        }
    };
});