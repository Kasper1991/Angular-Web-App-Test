var users = angular.module('app.users', []);

users.controller('UsersController', require('./users-controller'));
users.controller('UserController', require('./user-controller'));
users.factory('appUsers', require('./users-service'));
users.directive('appLoadUsers', require('./load-users-directive'));

module.exports = users;