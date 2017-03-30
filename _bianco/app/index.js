var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost', {
  clean: false,
  clientId: 'console_client'
});

client.on('connect', function () {
	client.subscribe('/hello/s-pro', {qos: 1});
  client.publish('/hello/s-pro', 'Hello, S-PRO!', 1);
});

client.on('message', function (topic, message) {
  logger(topic, message.toString());
  //client.end();
});

function logger() {
  console.log(new Date().toISOString().slice(0, 19).replace('T', ' ') + ': ' + Array.prototype.join.call(arguments, ': '));
}
