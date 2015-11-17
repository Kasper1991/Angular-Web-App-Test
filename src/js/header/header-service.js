module.exports = [

    '$rootScope',
    '$state',

    function($rootScope, $state) {

        var header =  {
                title: '',
                navigation: {},
                goBack: function() {

                    $state.go(this.navigation.prev, this.navigation.params)

                }
            },

            getParamsForPrevState = function(list, toParams) {

                return list.reduce(function(params, param) {

                    params[param] = toParams[param];

                    return params;

                }, {});
            },

            changeStateHandler = function(e, to, toParams) {

                var currStateData = $state.current.data,
                    prevStateName = currStateData.prevState;

                header.title = currStateData.title;

                if(!prevStateName) return header.navigation = {};

                header.navigation.prev = prevStateName;

                var prevState = $state.get(prevStateName),
                    prevStateParams = prevState.data.params;

                header.navigation.params = prevStateParams && getParamsForPrevState(prevStateParams, toParams);
            };

        $rootScope.$on('$stateChangeSuccess', changeStateHandler);

        return header;
    }
];
