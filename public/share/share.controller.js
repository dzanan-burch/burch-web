app.controller('ShareController', function($scope, $mdDialog, $state, $stateParams, $mdToast, Share, Workout) {
    $scope.user = {};
    if (!$stateParams.id) {
        $state.go('home');
    }
    $scope.workList = [];
    var share = {};
    Share.get($stateParams.id).then(function(res) {
        share = res.data.data;
        $scope.name = share[0].name;
        $scope.date = share[0].date;
        $scope.name = share[0].name;
        $scope.username = share[0].username;
        var service;
        if ($scope.username && $scope.date) {
            var range2 = new Date($scope.date);
            Workout.getByDate(range2, $scope.username).then(function(result) {
                $scope.workoutList = result.data.data;
            }, function(err) {
                $mdToast.show(
                    $mdToast.simple()
                      .textContent('Unable to get workout list')
                      .hideDelay(3000)
                );
            });
        }else {
            Workout.get($scope.username).then(function(result) {
                $scope.workoutList = result.data.data;
            }, function(err) {
                $mdToast.show(
                    $mdToast.simple()
                      .textContent('Unable to get workout list')
                      .hideDelay(3000)
                );
            });
        }
    }, function(err) {
        $mdToast.show(
            $mdToast.simple()
              .textContent('link is broken. can not get the page')
              .hideDelay(3000)
        );
    });
});