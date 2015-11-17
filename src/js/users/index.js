var users = angular.module('app.users', []);

users.factory('appUsers', require('./users-service'));

users.controller('UsersController', require('./users-controller'));
users.controller('UserController', require('./user-controller'));

module.exports = users;