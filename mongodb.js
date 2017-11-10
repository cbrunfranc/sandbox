var MongoClient = require ("mongodb").MongoClient;

function connect()
{
MongoClient.connect("mongodb://localhost:27017/sandbox", function (err,db) {
  if (err) return console.log (err.stack);
  console.log ('test');
});
};

exports.connect = connect ;
