module.exports = [

    '$stateProvider',
    '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('users', {
                url: '/',
                templateUrl: 'templates/users.html',
                controller: 'UsersController',
                data: {
                    title: 'Users'
                }
            })

            .state('user', {
                url: '/:login',
                templateUrl: 'templates/user.html',
                controller: 'UserController',
                data: {
                    title: 'Profile',
                    prevState: 'users',
                    params: ['login']
                }
            })

            .state('repo', {
                url: '/:login/:repo',
                templateUrl: 'templates/repo.html',
                controller: 'RepoController',
                data: {
                    title: 'Repository',
                    prevState: 'user',
                    params: ['login', 'repo']
                }
            })

            .state('commits', {
                url: '/:login/:repo/commits',
                templateUrl: 'templates/commits.html',
                controller: 'CommitsController',
                data: {
                    title: 'Commits',
                    prevState: 'repo',
                    params: ['login', 'repo']
                }
            })


    }
];
