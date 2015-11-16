module.exports = [

    '$document',
    '$window',

    function($document, $window) {

        return {

            restrict: 'A',

            link: function(scope, elem, attr) {

                var content = $document[0].getElementById('content');

                content.addEventListener('scroll', function() {

                    if(content.scrollTop + content.offsetHeight >= content.scrollHeight) {

                        scope.$apply(attr.appLoadUsers);

                    }
                });
            }
        }
    }
];
