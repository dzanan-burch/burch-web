app.controller('RegisterController', function($scope, $mdDialog, $state, $mdToast, Register) {
    var token = localStorage.getItem('token');
    if (token) {
        $state.go('home');
    }
    $scope.user = {};
    $scope.submit = function(ev) {
        //validation
        var name = $scope.user.name;
        var password = $scope.user.password;
        var username = $scope.user.id;
        Register.add(name, username, password).then(function(res) {
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Registration')
                  .textContent('You registration was successful. Please visit login page')
                  .ariaLabel('Success')
                  .ok('Okay!')
                  .targetEvent(ev)
            ).then(function() {
                $state.go('login');
            });
        }, function(err) {
            var message = 'Unable to register';
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