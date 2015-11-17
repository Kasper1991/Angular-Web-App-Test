module.exports = function() {

    return {

        scope: {},
        restrict: 'E',
        transclude: false,
        template: require('./header.html'),

        controller: ['$scope', 'appHeader', function ($scope, appHeader) {

            $scope.header = appHeader;

        }]
    }
}