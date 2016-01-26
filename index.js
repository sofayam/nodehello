var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
 
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/env', function (req, res) {
    res.write('this is the environment\n');

    for (var key in process.env) {
     	res.write(key + " : " + process.env[key] + "\n" );
    }
    res.end();
});
 
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
 
  console.log('Example app listening at http://%s:%s', host, port);
});
