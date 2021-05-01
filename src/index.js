import { mqLoad } from './loader/mq';
import botkit from './loader/botkit';
import express from 'express';
import { expressLoader } from './loader/express';
const app = express();
expressLoader(app);

app.listen(3002, () => {
  console.log('listen');
});
const controller = botkit(app);
async function load() {
  await mqLoad();
}

load();

app.post('/api/messages', function (req, res) {
  // respond to FB that the webhook has been received.
  res.status(200);
  res.send('ok');

  var bot = controller.spawn({});

  // Now, pass the webhook into be processed
  controller.handleWebhookPayload(req, res, bot);
});
// Perform the FB webhook verification handshake with your verify token
app.get('/api/receive', function (req, res) {
  if (req.query['hub.mode'] == 'subscribe') {
    if (req.query['hub.verify_token'] == controller.config.verify_token) {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('OK');
    }
  }
});

app.get('/', function (req, res) {
  res.json('hello world!');
});
