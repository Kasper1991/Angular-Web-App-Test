module.exports = [

    'appGitHubApiProvider',

    function(appGitHubApiProvider) {

        appGitHubApiProvider.setPagination({
            users: 20,
            commits: 5
        })
    }
];
