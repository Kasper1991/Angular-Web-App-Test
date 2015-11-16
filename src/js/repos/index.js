var repos = angular.module('app.repos', []);

repos.factory('appRepos', require('./repos-service'));

module.exports = repos;