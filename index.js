var express = require('express');


var app = express();

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['MongoDB-Service'][0]['credentials'];
}
else{
  var mongo = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"", 
    "name":"",
    "db":"db"
  }
}

var generate_mongo_url = function(obj){
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'test');

  if(obj.username && obj.password){
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
  else{
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);

var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

 
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

app.get('/mon', function (req, res) {
    res.write(mongourl+'\n');
    res.write(JSON.stringify(mongo)+'\n\n');
    res.write(JSON.stringify(process.env.VCAP_SERVICES)+'\n');
    res.end();
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
 
  console.log('Example app listening at http://%s:%s', host, port);
});
