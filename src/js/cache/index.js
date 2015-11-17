var cache = angular.module('app.cache', []);

cache.factory('appCache', [

    '$q',

    function($q) {

        var storages = {};

        return {

            set: function(storage, key, value) {

                storage in storages || (storages[storage] = {});

                if(key in storages[storage]) return;

                storages[storage][key] = value;

            },

            get: function(storage, key, notFoundCb) {

                var self = this,
                    item = storage in storages && storages[storage][key];

                if(item) {

                    return $q(function(resolve) {

                        resolve(item);

                    });

                } else {

                    return notFoundCb().then(function (data) {

                        self.set(storage, key, data);

                        return data;

                    })
                }
            }
        }
    }
]);

module.exports = cache;
