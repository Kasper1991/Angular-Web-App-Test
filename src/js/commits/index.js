var commits = angular.module('app.commits', []);

commits.factory('appCommits', require('./commits-service'));

commits.controller('CommitsController', require('./commits-controller'));

module.exports = commits;
