module.exports = [

    '$stateProvider',
    '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/users');

        $stateProvider

            .state('users', {
                url: '/users',
                templateUrl: 'templates/users.html',
                controller: 'UsersController',
                title: 'List of users'
            })

            .state('user', {
                url: '/users/:login',
                templateUrl: 'templates/user.html',
                controller: 'UserController',
                title: 'User profile'
            })

    }
];
