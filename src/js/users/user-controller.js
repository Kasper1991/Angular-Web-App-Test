module.exports = [

    '$scope',
    '$state',
    '$stateParams',
    'appUsers',

    function($scope, $state, $stateParams, appUsers) {

        var login = $stateParams.login;

        appUsers.getUser(login).then(function(user) {

            $scope.user = user;

        });

        $scope.showRepo = function(repo) {

            $state.go('repo', {

                login: login,
                repo: repo.name

            });
        };
    }
];
