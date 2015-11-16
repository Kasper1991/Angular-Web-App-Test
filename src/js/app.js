require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-material-icons');

require('./header');
require('./github-api');
require('./users');
require('./repos');

require('../styl/style.styl');

var app = angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngAnimate',
        'ngMdIcons',
        'app.header',
        'app.gitHubApi',
        'app.users',
        'app.repos'
    ]),

    router = require('./router');

app.config(router);

app.constant('API_URI', 'https://api.github.com/');
