var mqtt = require('mqtt');

function workflow ()
{


var client = mqtt.connect('mqtt://localhost:1883');

//client.on ('connect', function () { client.subscribe("demo");});

client.subscribe("demo");

client.on ('message', insertEvent);

/*client.on ('message', function (topic,message) {
  console.log (message.toString());
  client.end;
});
*/

console.log("test");

}

function insertEvent(topic,payload) {
console.log ("test mqtt");
}

//workflow();

//client.publish('test', 'Hello mqtt');

//client.end();

///worflow();

exports.workflow = workflow ;
//exports.insertEvent = insertEvent;
