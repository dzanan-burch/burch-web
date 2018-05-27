app.controller('HomeController', function($scope, $state, $mdSidenav, $mdDialog, $mdToast, Muscle, Exercise, Workout, Share) {
    
    var current = 'exercise';
    $scope.muscleList = [];
    $scope.exerciseList = [];
    $scope.workoutList = [];
    var username = localStorage.getItem('username');
    var name = localStorage.getItem('name');
    
    if (!username) {
        $state.go('login');
    }

    $scope.name = name;
    
    $scope.toggleSidenav = function() {
        $mdSidenav('left').toggle();
    };

    $scope.currentTab = function(value) {
        current = value;
    };
    
    $scope.selectedMuscleChange = function(muscle) {
        $scope.exerciseMuscle = muscle.name;
    };

    $scope.selectedExerciseChange = function(exercise) {
        $scope.workoutExercise = exercise.name;
    };

    $scope.getWorkout = function() {
        loadWorkout();
    };

    $scope.addNewDialog = function(ev, item) {
        if (current === 'exercise') {
            newExerciseDialog(ev, item);
        }else if (current == 'muscle') {
            newMuscleGroupDialog(ev, item);
        }else {
            newWorkoutDialog(ev, item);
        }
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.getSharelink = function(ev, date) {
        Share.add(username, username,  date).then(function(res) {
            var sharedLink = window.location.origin + '/#!/share/' + res.data.id;
            $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('Sharable Link')
                  .textContent(sharedLink)
                  .ariaLabel('Success')
                  .ok('Okay!')
                  .targetEvent(ev)
            ).then(function() {

            });
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to get sharable link')
                  .hideDelay(3000)
            );
        });
    };

    function newExerciseDialog(ev, exercise) {
        $mdDialog.show({
            locals: {exercise: exercise, muscleList: $scope.muscleList, username:username},
            controller: _ExerciseDialogController,
            templateUrl: 'home/dialogs/exercise.html',
            targetEvent: ev,
            clickOutsideToClose:true
        }).then(function() {
        }, function() {
            loadExercise();
        });
    }

    function newMuscleGroupDialog(ev, muscle) {
        $mdDialog.show({
            locals: {muscle: muscle, username:username},
            controller: _MuscleDialogController,
            templateUrl: 'home/dialogs/muscle.html',
            targetEvent: ev,
            clickOutsideToClose:true
        }).then(function() {
        }, function() {
            loadMuscles();
        });
    }

    function newWorkoutDialog(ev, workout) {
        $mdDialog.show({
            locals: {workout: workout, searchDate: $scope.searchDate, exerciseList: $scope.exerciseList, username:username},
            controller: _WorkoutDialogController,
            templateUrl: 'home/dialogs/workout.html',
            targetEvent: ev,
            clickOutsideToClose:true
        }).then(function() {
        }, function() {
            loadWorkout();
        });
    }


    function loadMuscles() {
        Muscle.get().then(function(result) {
            $scope.muscleList = result.data.data;
        }, function(err) {
            $scope.muscleList = [];
        });
    }
    
    function loadExercise() {
        Exercise.get().then(function(result) {
            $scope.exerciseList = result.data.data;
        }, function(err) {
            $scope.exerciseList = [];
        });
    }

    function loadWorkout() {
        if (!$scope.searchDate) {
            $scope.searchDate = new Date();
        }
        Workout.getByDate($scope.searchDate, username).then(function(result) {
            $scope.workoutList = result.data.data;
        }, function(err) {
            $scope.workoutList = [];
        });
    }
    loadExercise();
    loadMuscles();
    loadWorkout();

    $scope.logout = function() {
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        $state.go('login');
    };

    $scope.profile = function() {
        $state.go('profile');
    };
});


function _ExerciseDialogController($scope, $mdDialog, $mdToast, exercise, muscleList, username, Exercise) {
    $scope.muscleList = muscleList;
    if (exercise) {
        $scope.exercise = exercise;
        $scope.exerciseMuscle = exercise.muscle;
    }
    $scope.addExercise = function(exercise) {
        if (!$scope.exerciseMuscle) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Please select one muscle group')
                  .hideDelay(3000)
            );
            return;
        }
        Exercise.add(exercise.name, $scope.exerciseMuscle, username).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('New exercise added')
                  .hideDelay(3000)
            );
            $mdDialog.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to add new exercise')
                  .hideDelay(3000)
            );
        });
    };

    $scope.updateExercise = function() {
        if (!$scope.exerciseMuscle) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Please select one muscle group')
                  .hideDelay(3000)
            );
            return;
        }

        if (!$scope.exercise._id) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Required field id is missing')
                  .hideDelay(3000)
            );
            return;
        }

        Exercise.update($scope.exercise._id, exercise.name, $scope.exerciseMuscle, username).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Exercise updated successfully')
                  .hideDelay(3000)
            );
            $mdDialog.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to update exercise')
                  .hideDelay(3000)
            );
        });
    };

    $scope.deleteExercise = function() {
        if (!$scope.exercise._id) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Required field id is missing')
                  .hideDelay(3000)
            );
            return;
        }
        Exercise.delete($scope.exercise._id).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Exercise deleted successfully')
                  .hideDelay(3000)
            );
            $mdDialog.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to delete exercise')
                  .hideDelay(3000)
            );
        });
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}

function _MuscleDialogController($scope, $mdDialog, $mdToast, muscle, username, Muscle) {
    if (muscle) {
        $scope.muscle = muscle;
    }
    
    $scope.addMuscle = function(muscle) {
        Muscle.add(muscle.name, muscle.description).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('New muscle group added')
                  .hideDelay(3000)
            );
            $mdDialog.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to add new muscle group')
                  .hideDelay(3000)
            );
        });
    };

    $scope.updateMuscle = function() {
        if (!$scope.muscle._id) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Required field id is missing')
                  .hideDelay(3000)
            );
            return;
        }

        Muscle.update($scope.muscle._id, $scope.muscle.name, $scope.muscle.description).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Muscle group updated successfully')
                  .hideDelay(3000)
            );
            $mdDialog.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to update muscle group')
                  .hideDelay(3000)
            );
        });
    };

    $scope.deleteMuscle = function() {
        if (!$scope.muscle._id) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Required field id is missing')
                  .hideDelay(3000)
            );
            return;
        }
        Muscle.delete($scope.muscle._id).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Muscle group deleted successfully')
                  .hideDelay(3000)
            );
            $mdDialog.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to delete muscle group')
                  .hideDelay(3000)
            );
        });
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}

function _WorkoutDialogController($scope, $mdDialog, $mdToast, workout, searchDate, exerciseList, username, Workout) {
    $scope.exerciseList = exerciseList;
    $scope.weightnreps = [];
    if (workout) {
        $scope.workout = workout;
        $scope.weightnreps = workout.workout;
        $scope.workoutExercise = workout.exercise;
    }
    $scope.add = function(weight, reps) {
        var obj = {
            weight: weight,
            reps: reps
        };
        $scope.weightnreps.push(obj);
        $scope.weight = '';
        $scope.reps = '';
    };

    $scope.clear = function(index) {
        $scope.weightnreps.splice(index, 1);
    };


    $scope.addWorkout = function(workout) {
        Workout.add($scope.workoutExercise, $scope.weightnreps, searchDate, username).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('New workout added')
                  .hideDelay(3000)
            );
            $scope.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to add new workout')
                  .hideDelay(3000)
            );
        });
    };

    $scope.updateWorkout = function() {
        if (!$scope.workout._id) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Required field id is missing')
                  .hideDelay(3000)
            );
            return;
        }

        Workout.update($scope.workout._id, $scope.workoutExercise, $scope.weightnreps).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Workout updated successfully')
                  .hideDelay(3000)
            );
            $mdDialog.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to update workout')
                  .hideDelay(3000)
            );
        });
    };

    $scope.deleteWorkout = function() {
        if (!$scope.workout._id) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Required field id is missing')
                  .hideDelay(3000)
            );
            return;
        }
        Workout.delete($scope.workout._id).then(function(res) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Workout deleted successfully')
                  .hideDelay(3000)
            );
            $mdDialog.cancel();
        }, function(err) {
            $mdToast.show(
                $mdToast.simple()
                  .textContent('Unable to delete workout')
                  .hideDelay(3000)
            );
        });
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}