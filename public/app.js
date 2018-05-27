var app = angular.module('exerciseapp', ['ngMaterial', 'ngMessages', 'ui.router']);

app.config(function($mdThemingProvider, $mdDateLocaleProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('cyan', {
      'default': '400',
      'hue-1': '100',
      'hue-2': '600',
      'hue-3': 'A100'
    })
    .accentPalette('amber')
    .warnPalette('red')
    .backgroundPalette('grey');

    $mdThemingProvider.enableBrowserColor({
        theme: 'default', // Default is 'default'
        palette: 'cyan', // Default is 'primary', any basic material palette and extended palettes are available
        hue: '200' // Default is '800'
    });

    $mdDateLocaleProvider.formatDate = function(date) {

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
    
        return day + '/' + (monthIndex + 1) + '/' + year;
    
    };
});

app.run(function($location) {
    var token = localStorage.getItem('token');
    var path = $location.path();
    if (!token) {
        if (path !== '/login' || path !== '/register' || path.substring(0,6) !== '/share') {
            var page = path.substring(0,6);
            if (page === '/share') {
                
            }else {
                $location.replace().path('#!/login');
            }
        }
    }else {
        if (path === '/login' || path === '/register' || path === '/') {
            $location.replace().path('#!/home');
        }
    }
});

app.controller('MainController', function($scope) {
    $scope.title = "Exercise App";
});

