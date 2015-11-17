var gitHubApi = angular.module('app.gitHubApi', []);

gitHubApi.config([

    '$httpProvider',

    function($httpProvider) {

        $httpProvider.interceptors.push('gitHubApiErrorHandler');
    }
]);

gitHubApi.factory('gitHubApiErrorHandler', require('./error-handler-service'));

gitHubApi.factory('gitHubApiRequests', require('./requests-service'));

gitHubApi.provider('appGitHubApi', require('./github-api-provider'));

module.exports = gitHubApi;
