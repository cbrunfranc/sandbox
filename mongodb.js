var MongoClient = require ("mongodb").MongoClient;
//var collection;

function connect()
{
MongoClient.connect("mongodb://localhost:27017/sandbox", setup);
};

function setup (err,db) {
  if (err) return console.log (err.stack);
  var myobj = {name : "test" , adress : 'hello'};
  db.collection("test").insertOne(myobj, toInsert);
  console.log ('test');
};

function toInsert(err, res)
{
  if (err) return console.log (err.stack);
  console.log ("test");
}

/*function insert(topic,payload)
{
  var key=topic.replace(deviceRoot,'');
  var db = MongoClient.db("integration_tests");
  var collection = db.collection("demo");
  collection.update();
}
*/

exports.connect = connect ;
//exports.insert = insert ;
