var gitHubApi = angular.module('app.gitHubApi', []);

gitHubApi.factory('appGitHubApi', [

    '$http',
    'API_URI',

    function($http, API_URI){

        var linkHeaders = {},

            parseLinkHeader = function(linkHeader) {

                return linkHeader.split(',').reduce(function(links, part){

                    var link = part.split(';'),
                        url = link[0].replace(/<(.*)>/, '$1').trim(),
                        name = link[1].replace(/rel="(.*)"/, '$1').trim();

                    links[name] = url; return links;

                }, {});
            },

            request = function(type, url) {

                return $http.get(url).then(function(res) {

                    var linkHeader = res.headers().link;

                    if(linkHeader) linkHeaders[type] = parseLinkHeader(linkHeader);

                    return res.data;
                });
            },

            getNextLinkHeaders = function(type) {

                return linkHeaders[type] && linkHeaders[type].next;

            };

        return {

            getUsers: function(perPage) {

                var url = getNextLinkHeaders('users') || (API_URI + 'users?per_page=' + perPage);

                return request('users', url);
            },

            getUser: function(login) {

                var url = API_URI + 'users/' + login;

                return request('user', url);
            },

            getRepos: function(login, perPage, repos) {

                repos || (repos = []);

                var url = getNextLinkHeaders('repos') || (API_URI + 'users/' + login + '/repos?per_page=' + perPage),

                    self = this;

                return request('repos', url).then(function(newRepos) {

                    repos = repos.concat(newRepos);

                    if(getNextLinkHeaders('repos')) return self.getRepos(login, perPage, repos);

                    return repos;

                });
            }
        };
    }
]);

module.exports = gitHubApi;
