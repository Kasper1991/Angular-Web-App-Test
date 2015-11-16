module.exports = [

    '$scope',
    '$stateParams',
    'appUsers',

    function($scope, $stateParams, appUsers) {

        var login = $stateParams.login;

        appUsers.getUser(login).then(function(user) {

            $scope.user = user;

        });
    }
];
