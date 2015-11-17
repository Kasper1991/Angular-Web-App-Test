module.exports = [

    '$scope',
    '$state',
    '$stateParams',
    'appRepos',

    function($scope, $state, $stateParams,  appRepos) {

        var login = $stateParams.login,
            repo = $stateParams.repo;

        appRepos.getRepo(login, repo).then(function(repo) {

            $scope.repo = repo;

        });

        $scope.showCommits = function() {

            $state.go('commits', {
                login: login,
                repo: repo
            });

        }
    }
];
