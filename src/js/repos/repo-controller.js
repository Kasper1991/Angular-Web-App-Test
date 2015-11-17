module.exports = [

    '$scope',
    '$state',
    '$stateParams',
    'appRepos',

    function($scope, $state, $stateParams,  appRepos) {

        var login = $stateParams.login,

            name = $stateParams.repo;

        appRepos.getRepo(login, name).then(function(repo) {

            $scope.repo = repo;

        });
    }
];
