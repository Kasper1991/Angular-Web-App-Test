module.exports = [

    '$scope',
    '$state',
    '$stateParams',
    'appCommits',

    function($scope, $state, $stateParams, appCommits) {

        var login = $stateParams.login,
            repo = $stateParams.repo;

        appCommits.init(login, repo);

        $scope.commits = appCommits.commits;

        $scope.loadMoreCommits = function() {

            appCommits.getCommits();

        }
    }
];
