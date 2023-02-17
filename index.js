const wppconnect = require('@wppconnect-team/wppconnect');
const controller = require('./controller');

wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage((message) => {
    controller.reply(client, message);
  });
}