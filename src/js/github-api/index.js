var gitHubApi = angular.module('app.gitHubApi', []);

gitHubApi.factory('appGitHubApi', [

    '$http',
    'API_URI',

    function($http, API_URI){

        var parseLinkHeader = function(linkHeader) {

                return linkHeader.split(',').reduce(function(links, part){

                    var link = part.split(';'),
                        url = link[0].replace(/<(.*)>/, '$1').trim(),
                        name = link[1].replace(/rel="(.*)"/, '$1').trim();

                    links[name] = url; return links;

                }, {});
            },

            request = function(url, cb) {

                return $http.get(url).then(function(res) {

                    var linkHeader = res.headers().link,

                        data = res.data;

                    if(linkHeader && cb) cb(parseLinkHeader(linkHeader));

                    return data;
                });
            },

            recursiveRequest = function(url, fullData){

                fullData || (fullData = []);

                var currLinks = {};

                return request(url, function(links) {

                    currLinks = links;

                }).then(function(data) {

                    fullData = fullData.concat(data);

                    return currLinks.next ? recursiveRequest(currLinks.next, fullData) : fullData;

                });
            };

        return {

            users: {

                links: {},

                part: function(perPage) {

                    var url = this.links.next || (API_URI + 'users?per_page=' + perPage);

                    return request(url, function(links) {

                        this.links = links;

                    }.bind(this));
                },

                single: function(login) {

                    var url = API_URI + 'users/' + login;

                    return request(url);
                }
            },

            repos: {

                all: function(login) {

                    var url = API_URI + 'users/' + login + '/repos';

                    return recursiveRequest(url);
                },

                single: function(login, name) {

                    var url = API_URI + 'repos/' + login + '/' + name;

                    return request(url);

                }
            },

            branches: {

                all: function(login, name) {

                    var url = API_URI + 'repos/' + login + '/' + name + '/branches';

                    return recursiveRequest(url);

                }
            },

            commits: {

                all: function(login, name) {

                    var url = API_URI + 'repos/' + login + '/' + name + '/commits';

                    return recursiveRequest(url);
                }
            }
        };
    }
]);

module.exports = gitHubApi;
