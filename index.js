var server = require("./server.js");
var mongodb = require ("./mongodb.js")
var mqtt = require ("./mqtt.js");
var config = require ("./config.js");

//mqtt.workflow();
//mongodb.connect();
server.start();
