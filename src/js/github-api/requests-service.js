module.exports = [

    '$http',
    '$q',

    function($http, $q) {

        var parseLinkHeader = function(linkHeader) {

            return linkHeader.split(',').reduce(function(links, part){

                var link = part.split(';'),
                    url = link[0].replace(/<(.*)>/, '$1').trim(),
                    name = link[1].replace(/rel="(.*)"/, '$1').trim();

                links[name] = url; return links;

            }, {});
        };

        return {

            request: function(url, cb) {

                return $http.get(url).then(function(res) {

                    var linkHeader = res.headers().link,

                        data = res.data;

                    if(linkHeader && cb) cb(parseLinkHeader(linkHeader));

                    return data;
                });
            },

            recursiveRequest: function(cb){

                var self = this,
                    currLinks = {};

                return function() {

                    var firstUrl = cb.apply(null, arguments),
                        fullData = [],

                        loop = function(url) {

                            return self.request(url, function(links) {

                                currLinks = links;

                            }).then(function(data) {

                                fullData = fullData.concat(data);

                                return currLinks.next ? loop(currLinks.next) : fullData;

                            })
                        };

                    return loop(firstUrl);
                };
            },

            partialRequest: function(cb) {

                var self = this,
                    currLinks = {},
                    firstLoading = true;

                return function() {

                    var firstUrl = cb.apply(null, arguments),

                        getPart = function(url) {

                            firstLoading = false;

                            return self.request(url, function(links) {

                                currLinks = links;

                            })
                        };

                    if(currLinks.next) return getPart(currLinks.next);

                    if(firstLoading) return getPart(firstUrl);

                    return $q(function(resolve) {

                        firstLoading = true;

                        resolve(false);
                    });
                }
            }
        }

    }
];
