var express = require ("express");
var app = express();
//var os = require (os);
//const http = require('http')

var Influx = require ('influx');
//var influx = new Influx.InfluxDB('http://localhost:8086/database')

var influx = new Influx.InfluxDB({
  host: 'localhost:3000',
  database: 'express_response_db',
  schema: [
    {
      measurement: 'response_times',
      fields: {
        path: Influx.FieldType.STRING,
        duration: Influx.FieldType.INTEGER
      },
      tags: [
        'host'
      ]
    }
  ]
})


influx.getDatabaseNames()
  .then(names => {
    console.log ('a');
    if (!names.includes('express_response_db')) {
      return influx.createDatabase('express_response_db');
    }
  })
  .then(() => {
    console.log('b');
    app.listen (3000);
    /*http.createServer(app).listen(3000, function () {
      console.log('Listening on port 3000')
    })*/
  })
  .catch(err => {
    console.log (err.stack);
    console.error(`Error creating Influx database!`);
  })

  app.use((req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`Request to ${req.path} took ${duration}ms`);

    influx.writePoints([
      {
        measurement: 'response_times',
        tags: { host: 'test' /*os.hostname() */ },
        fields: { duration, path: req.path },
      }
    ]).catch(err => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`)
    })
  })
  return next()
})

app.get('/', function (req, res) {
  setTimeout(() => res.end('Hello world!'), Math.random() * 500)
})

app.get('/times', function (req, res) {
  influx.query(`
    select * from response_times
    where host = ${Influx.escape.stringLit('test' /*os.hostname()*/)}
    order by time desc
    limit 10
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

//exports.test = test;
