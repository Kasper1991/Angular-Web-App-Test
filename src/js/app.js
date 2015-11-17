require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-material-icons');

require('./header');
require('./github-api');
require('./partial-loading');
require('./users');
require('./repos');
require('./commits');

require('../styl/style.styl');

var app = angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngAnimate',
        'ngMdIcons',
        'app.header',
        'app.gitHubApi',
        'app.partialLoading',
        'app.users',
        'app.repos',
        'app.commits'
    ]),

    router = require('./router'),

    apiConfig = require('./api-config');

app.config(router);

app.config(apiConfig);