module.exports = [

    '$q',
    'appGitHubApi',

    function($q, appGitHubApi) {

        var service = {

            users: [],

            getUsers: function() {

                var self = this;

                appGitHubApi.getUsers(20).then(function(users) {

                    users.forEach(function(user){

                        self.users.push(user);

                    });
                })
            },

            getUser: function(login) {

                return $q

                    .all([

                        appGitHubApi.getUser(login),
                        appGitHubApi.getRepos(login, 50)

                    ]).then(function(res) {

                        var user = res[0], repos = res[1];

                        user.repos = repos;

                        return user;
                    });
            }
        };

        service.getUsers();

        return service;
    }
];