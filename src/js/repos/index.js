var repos = angular.module('app.repos', []);

repos.controller('RepoController', require('./repo-controller'));
repos.factory('appRepos', require('./repos-service'));

module.exports = repos;