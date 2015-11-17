module.exports = [

    'appGitHubApi',
    '$q',

    function(appGitHubApi, $q) {

        return {

            getRepo: function(login, name) {

                return $q

                    .all([

                        appGitHubApi.repos.single(login, name),
                        appGitHubApi.branches.all(login, name)

                    ])

                    .then(function(res) {

                        var repo = res[0], branches = res[1];

                        repo.branches = branches;

                        return repo;

                    });
            }
        }
    }
];
