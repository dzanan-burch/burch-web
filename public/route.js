app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('default', {
            url: '/',
            templateUrl: 'login/login.html',
            controller: 'LoginController',
        })
        .state('login', {
            url: '/login',
            templateUrl: '/login/login.html',
            controller: 'LoginController',
        })
        .state('register', {
            url: '/register',
            templateUrl: '/register/register.html',
            controller: 'RegisterController',
        })
        .state('home', {
            url: '/home',
            templateUrl: '/home/home.html',
            controller: 'HomeController',
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '/profile/profile.html',
            controller: 'ProfileController',
        })
        .state('share', {
            url: '/share/:id',
            templateUrl: '/share/share.html',
            controller: 'ShareController',
        });

        $urlRouterProvider.otherwise('/');
  });
  