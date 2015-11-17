var partialLoading = angular.module('app.partialLoading', []);

partialLoading.directive('appPartialLoading', [

    '$document',

    function($document) {

        return {

            restrict: 'A',

            link: function(scope, elem, attr) {

                var content = $document[0].getElementById('content');

                if(!content) throw Error('content element not found');

                content.addEventListener('scroll', function() {

                    if(content.scrollTop + content.offsetHeight >= content.scrollHeight) {

                        scope.$apply(attr.appPartialLoading);

                    }
                });
            }
        }
    }
]);

module.export = partialLoading;
