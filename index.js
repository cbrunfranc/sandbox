var express = require ("express");
var app = express();
var MongoClient = require ("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/mongodbcbf", function (err,db) {
  if (err) return console.log (err.stack);
  console.log ('test');
});

app.set ('views','./views');
app.set ('view engine','pug');

app.get ('/test',function(req,res) {
res.status (404);
res.render ('index', { test : 'christophe'});
})

app.use (function(req,res) {
 res.setHeader('Content-Type', 'text/plain ');
 res.status(404).send('test cbf');
})

app.listen(8080);
