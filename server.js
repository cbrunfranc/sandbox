var express = require ("express");
var app = express();

function start ()
{
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
};

exports.start = start;
