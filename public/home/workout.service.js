var token = localStorage.getItem('token');
app.factory('Workout',function($http){
    return {
        add:function(exercise, workout, date, username) {
            return $http.post('/workout/add', {exercise: exercise, workout: workout, date: date, username: username}, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        update:function(id, exercise, workout, date) {
            return $http.put('/workout/update', {_id: id, exercise: exercise, workout: workout}, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        delete:function(id) {
            return $http.delete('/workout/delete/'+ id, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        get:function(username) {
            return $http.get('/workout/get/' + username, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        },

        getByDate:function(range2, username) {
            var range1 = new Date(range2.getTime() - (1*24*60*60*1000));
            return $http.post('/workout/get/' + username, {range1: range1, range2: range2}, { 
                headers: { Authorization: 'Bearer ' + token }
            });
        }
    };
});