module.exports = [

    'appGitHubApi',

    function(appGitHubApi) {

        var currLogin, currRepo, isDone;

        return {

            commits: [],

            init: function(login, repo) {

                currLogin = login;
                currRepo = repo;
                isDone = false;

                this.commits = [];

                this.getCommits();
            },

            getCommits: function() {

                if(isDone) return;

                var self = this;

                appGitHubApi.commits.part(currLogin, currRepo).then(function(commits) {

                    if(!commits) return isDone = true;

                    commits.forEach(function(commit) {

                        self.commits.push(commit);

                    });
                })
            }
        }
    }
];