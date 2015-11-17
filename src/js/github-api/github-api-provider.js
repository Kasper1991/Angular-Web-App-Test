module.exports = function(){

    var API_URI = 'https://api.github.com/',

        pagination = {
            users: 100,
            repos: 100,
            commits: 100,
            branches: 100
        };

    this.setApiUri = function(uri) {

        API_URI = uri;

    };

    this.setPagination = function(params) {

        angular.extend(pagination, params);

    };

    this.$get = [

        'gitHubApiRequests',

        function(gitHubApiRequests) {

            return {

                users: {

                    part: gitHubApiRequests.partialRequest(function() {

                        return API_URI + 'users?per_page=' + pagination.users;

                    }),

                    single: function(login) {

                        var url = API_URI + 'users/' + login;

                        return gitHubApiRequests.request(url);
                    }
                },

                repos: {

                    all: gitHubApiRequests.recursiveRequest(function(login) {

                        return API_URI + 'users/' + login + '/repos?per_page=' + pagination.repos;

                    }),

                    single: function(login, repo) {

                        var url = API_URI + 'repos/' + login + '/' + repo;

                        return gitHubApiRequests.request(url);

                    }
                },

                branches: {

                    all: gitHubApiRequests.recursiveRequest(function(login, repo) {

                        return  API_URI + 'repos/' + login + '/' + repo + '/branches?per_page=' + pagination.branches;

                    })
                },

                commits: {

                    part: gitHubApiRequests.partialRequest(function(login, repo) {

                        return API_URI + 'repos/' + login + '/' + repo + '/commits?per_page=' + pagination.commits;

                    })
                }
            }
        }
    ]
};
