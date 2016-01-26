var express = require('express');

var app = express();

function getmongoenv() {
    var mongo = 0;
    if(process.env.VCAP_SERVICES){
	var env = JSON.parse(process.env.VCAP_SERVICES);
	mongo = env['MongoDB-Service'][0]['credentials'];
    }
    else {
	mongo = {
	    "hostname":"localhost",
	    "port":27017,
	    "username":"",
	    "password":"", 
	    "name":"",
	    "db":"foo"
	}
    return mongo;
    }
}

var generate_mongo_url = function(obj) {
    if(process.env.VCAP_SERVICES){
	return obj.uri
    }
    if(obj.username && obj.password){
	return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else {
	return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}

function getURI() {
     if(process.env.VCAP_SERVICES){   
	var env = JSON.parse(process.env.VCAP_SERVICES);
	return (env['MongoDB-Service'][0]['credentials']['uri']);
    } else {
	return "mongodb://hostname:27017/db"
    }

}

var port = (process.env.PORT || 3000);
 

app.get('/env', function (req, res) {
    res.write('this is the environment\n');
    for (var key in process.env) {
     	res.write(key + " : " + process.env[key] + "\n" );
    }
    res.end();
});

app.get('/', function (req, res) {
    var mongourl = getURI();
    res.write(mongourl+'\n');
    //res.write(JSON.stringify(mongo)+'\n\n');
    //res.write(JSON.stringify(process.env.VCAP_SERVICES)+'\n');
    res.end();
});



var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
 
  console.log('Example app listening at http://%s:%s', host, port);
});
