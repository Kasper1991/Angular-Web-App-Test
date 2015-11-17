module.exports = [

    '$scope',
    '$state',
    '$stateParams',
    'appUsers',
    'appRepos',

    function($scope, $state, $stateParams, appUsers, appRepos) {

        var login = $stateParams.login;

        appUsers.getUser(login).then(function(user) {

            $scope.user = user;

        });

        appRepos.getRepos(login).then(function(repos) {

            $scope.repos = repos;

        });

        $scope.showRepo = function(repo) {

            $state.go('repo', {
                login: login,
                repo: repo.name
            });
        };
    }
];
