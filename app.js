
// Load all required modules
var express = require('express');
var apiRoute = require('./api/api');
var bodyParser = require('body-parser')
var app = express()

// Use bodyParser to send JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Allow Cross-Domain-Requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Make Public directory accessible
app.use(express.static(__dirname + '/public'));

//Routing directories
app.use('/api', apiRoute);

// Serve index.html for all Calls except API ones - Even when pages are not supported or errors occur
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

//Error function
app.use(function (req, res, next) {
  res.status(404).send("I'm sorry, your princess is in another castle!")
})

var port = 80;
app.listen(port, function() {
    console.log('Server runnning on Port: ' + port);
});
