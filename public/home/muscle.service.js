var token = localStorage.getItem('token');
app.factory('Muscle',function($http){
    return {
        add:function(name, description) {
            return $http.post('/muscle/add', {name: name, description: description}, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        update:function(id, name, description) {
            return $http.put('/muscle/update', {_id: id, name: name, description: description}, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        delete:function(id) {
            return $http.delete('/muscle/delete/' + id, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        get:function() {
            return $http.get('/muscle/get', { 
                headers: { Authorization: 'Bearer ' + token }
            });
        }
    };
});