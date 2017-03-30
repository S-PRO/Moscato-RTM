var mosca = require('mosca');

var mongo_con = 'mongodb://localhost:27017/mqtt';

var ascoltatore = {
    type: 'mongo',
    url: mongo_con,
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var settings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: mongo_con
  }
};

var http     = require('http'),
    httpServ = http.createServer(),
    mqttServ = new mosca.Server(settings);

mqttServ.attachHttpServer(httpServ);
httpServ.listen(3000);

mqttServ.on('ready', ready);

function logger() {
  console.log(new Date().toISOString().slice(0, 19).replace('T', ' ') + ': ' + Array.prototype.join.call(arguments, ': '));
}

// server.on('clientConnected', function(client) {
//   logger('client connected', client.id);
// });

// server.on('clientDisconnected', function(client) {
//   logger('client disconnected', client.id);
// });

mqttServ.on('published', function(packet, client) {
    logger(packet.topic, packet.payload);
});

function ready() {
  logger('Mosca server is up and running');

  // for (let i=0; i<1000; i++) {
  //   setTimeout(function() {
  //
  //     var message = {
  //       topic: '/hello/s-pro',
  //       payload: new Buffer('Message #' + i),
  //       qos: 1,
  //       retain: false
  //     };
  //     mqttServ.publish(message, function() {
  //     });
  //
  //   }, 3000 * i);
  // }

}
