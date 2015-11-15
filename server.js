var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, 'localhost', function() {

    console.log(server.address());

});
