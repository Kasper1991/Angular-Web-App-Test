module.exports = [

    '$scope',
    '$state',
    'appUsers',

    function($scope, $state, appUsers) {

        $scope.users = appUsers.users;

        $scope.loadMoreUsers = function() {

            appUsers.getUsers();
        };

        $scope.showUser = function(user) {

            $state.go('user', {

                login: user.login

            });
        };
    }
];
