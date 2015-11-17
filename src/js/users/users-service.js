module.exports = [

    '$q',
    'appGitHubApi',

    function($q, appGitHubApi) {

        var service = {

                users: [],

                getUsers: function() {

                    var self = this;

                    appGitHubApi.users.part(50).then(function(users) {

                        users.forEach(function(user){

                            self.users.push({
                                login: user.login,
                                avatar_url: user.avatar_url
                            });
                        });
                    })
                },

                getUser: function(login) {

                    return appGitHubApi.users.single(login).then(function(user) {

                        return {
                            avatar_url: user.avatar_url,
                            login: user.login,
                            name: user.name,
                            location: user.location,
                            email: user.email,
                            blog: user.blog
                        }
                    })
                }
            };

        service.getUsers();

        return service;
    }
];