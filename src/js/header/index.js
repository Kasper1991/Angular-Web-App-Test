var header = angular.module('app.header', []);

header.directive('appHeader', function() {

    return {

        scope: {},
        restrict: 'E',
        transclude: false,
        template: require('./header.html'),

        controller: ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {

            $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams) {

                $scope.title = $state.current.data.title;

                var prevStateName = $state.current.data.prevState;

                if(!prevStateName) {

                    $scope.prevState = null;
                    $scope.prevStateParams = null;

                } else {

                    $scope.prevState = prevStateName;

                    var prevState = $state.get(prevStateName),
                        prevStateParams = prevState.data.params;

                    $scope.prevStateParams = prevStateParams && prevStateParams.reduce(function(params, param) {

                        params[param] = toParams[param];

                        return params;

                    }, {});
                }
            });

            $scope.goBack = function() {

                $state.go($scope.prevState, $scope.prevStateParams);

            }
        }]
    }
});

module.exports = header;