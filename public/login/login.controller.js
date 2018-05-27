app.controller('LoginController', function($scope, $state, $mdToast, Login) {
    var token = localStorage.getItem('token');
    if (token) {
        $state.go('home');
    }
    $scope.title = "Login Page";
    $scope.user = {};
    $scope.submit = function() {
        var username = $scope.user.id;
        var password = $scope.user.password;
        Login.login(username, password).then(function(result) {
            localStorage.setItem('username', username);
            localStorage.setItem('name', result.data.name);
            localStorage.setItem('token', result.data.token);
            window.location.href='/';
        }, function(err) {
            var message = 'Unable to login';
            if (err.data && err.data.message) {
                message = err.data.message;
            }
            $mdToast.show(
                $mdToast.simple()
                  .textContent(message)
                  .hideDelay(3000)
            );
        });
    };
});