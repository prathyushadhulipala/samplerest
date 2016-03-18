var http = require("http");
var port = process.env.PORT || 3000;
var data = "{\"employees\":[{\"firstName\":\"John\", \"lastName\":\"Doe\"},{\"firstName\":\"Anna\", \"lastName\":\"Smith\"},{\"firstName\":\"Peter\", \"lastName\":\"Jones\"}]}";
var Cloudant = require("cloudant");
var userdetails = require("./core/userdetails");
var express = require('express');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.bodyParser());
app.get('/', function(req, resp) {
	console.log("Server.js invoked with blank url");
	resp.send("No Query Added");
});
app.get('/read', function(req, resp) {
	console.log("Server.js invoked with read url");
	console.log("document id from request param"+req.params.id);
	userdetails.readDocument(req.query.id, function(err, data) {
		if (err) {
			console.log("Data retrieval failed");
			resp.send(err);
		} else if (data) {
			console.log("Data retrieved", data);
			resp.send(data);
		}
	});
});
app.get('/', function(req, resp) {
	console.log("Server.js invoked with blank url");
	resp.send("No Query Added");
});

app.post('/update', function(req, resp) {
	console.log("Server.js invoked with update url");
	var id = req.body['_id'];
	console.log("JSON object id from request"+id);
	resp.write("update Query");
	userdetails.updateDocument(req.body, id, function(err, data) {
		if (err) {
			console.log("Data updation failed");
			resp.send(err);
		} else if (data) {
			console.log("Data updated", data);
			resp.send(data);
		}
	});
});
app.post('/', function(req, resp) {
	console.log("Server.js invoked with blank url");
	resp.send("No Query Added");
});
app.post('/create', function(req, resp) {
	console.log("Server.js invoked with create url");
	userdetails.createDocument(req.body, function(err, data) {
		if (err) {
			console.log("Data creation failed");
		} else if (data) {
			console.log("document created", data);
			resp.send(data);
		}
	});
});
app.get('/delete', function(req, resp) {
	console.log("Server.js invoked with blank url");
	resp.send("No Query Added");
});
app.get('/deleterecord', function(req, resp) {
	console.log("Server.js invoked with delete url");
	userdetails.deleteDocument(req.query.id, function(err, data) {
		if (err) {
			console.log("Data deletion failed");
		} else if (data) {
			console.log("Data deleted", data);
			resp.send(data);
		}
	});

});

app.post('/updateVaccination', function(req, resp){
	console.log("update vaccination invoked");
	var rfid = req.body['rfid'];
	var data = req.body['data'];
	userdetails.updateVaccination(data, rfid, function(err, data) {
		if (err) {
			console.log("Data updation failed");
			resp.send(err);
		} else if (data) {
			console.log("Data updated", data);
			resp.send(data);
		}
	});
});

app.post('/retrieveNextVaccination', function(req, resp){
	console.log("retrieve vaccination invoked");
	var rfid = req.body['rfid'];
	var id = req.body['_id'];
	resp.writeHead(200, {
		'Content-Type' : 'text/html'
	});
	userdetails.retrieveNextVaccination(id, rfid, function(err, data)
			{
			if(err)
				{
				resp.send(err);
				}
			else if(data)
			{
				console.log("Data recieved is "+JSON.stringify(data));
				resp.send(data);
			}
			});
});

app.get('/listFarmers', function(req, resp) {
	console.log("listFarmers invoked");
	userdetails.retrieveFarmers(function(data) {
		if (data) {
			console.log("Data retrieved", data);
			//resp.write(JSON.stringify(data));
			resp.send(data);
		}
	});
});

app.listen(port);