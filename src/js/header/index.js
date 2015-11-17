var header = angular.module('app.header', []);

header.directive('appHeader', require('./header-directive'));

header.factory('appHeader', require('./header-service'));

module.exports = header;