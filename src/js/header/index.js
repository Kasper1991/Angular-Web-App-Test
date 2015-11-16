var header = angular.module('app.header', []);

header.directive('appHeader', function() {

    return {

        scope: {},
        restrict: 'E',
        transclude: false,
        template: require('./header.html'),

        controller: ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

            $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {

                $scope.showBackLink = false;

                $scope.title = to.title;

                if(from.name) {

                    $scope.backLink = from.name;
                    $scope.backLinkParams = fromParams;

                } else {

                    $scope.backLink = false;
                }
            });

            $scope.goBack = function() {

                $state.go($scope.backLink, $scope.backLinkParams);

            }
        }]
    }
});

module.exports = header;