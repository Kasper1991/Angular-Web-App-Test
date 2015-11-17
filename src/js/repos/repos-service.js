module.exports = [

    'appGitHubApi',
    '$q',

    function(appGitHubApi, $q) {

        return {

            getRepo: function(login, name) {

                return $q

                    .all([

                        appGitHubApi.repos.single(login, name),
                        appGitHubApi.branches.all(login, name, 50)

                    ])

                    .then(function(res) {

                        var repo = res[0], branches = res[1];

                        repo = {
                            name: repo.name,
                            description: repo.description
                        };

                        repo.branches = branches.map(function(branch) {

                            return {
                                name: branch.name
                            }
                        });

                        return repo;
                    });
            },

            getRepos: function(login) {

                return appGitHubApi.repos.all(login).then(function(repos){

                    return repos.map(function(repo) {

                        return {
                            name: repo.name,
                            description: repo.description,
                            language: repo.language
                        }
                    })
                });
            }
        }
    }
];
