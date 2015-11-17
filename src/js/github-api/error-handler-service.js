module.exports = [

    function() {

        return {

            responseError: function(err) {

                var headers = err.headers();

                if(headers['x-ratelimit-remaining'] == 0) {

                    var resetTime = new Date(headers['x-ratelimit-reset'] * 1000),

                        now = (new Date).getTime(),

                        remaining = (resetTime - now) / 1000 / 60;

                    err.data = [];

                    alert('API rate limit exceeded, try after ' + remaining.toFixed() + ' min');
                }

                return err;
            }
        };
    }
];
