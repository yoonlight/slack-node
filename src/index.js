import { mqLoad } from './loader/mq';
import { controller, adapter } from './loader/botkit';
import express from 'express';
import { expressLoader } from './loader/express';
import { SlackBotWorker } from 'botbuilder-adapter-slack';
async function load() {
  await mqLoad();
}

load();

controller.on('message', async (bot, message) => {
  await bot.reply(message, 'I heard a message!');
});
const port = process.env.PORTy;
const app = express();
expressLoader(app);

app.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    console.log(context);
    console.log('hello');
    res.json(context);
  });
});

app.listen(port, () => {
  console.log('Node Slack App listening on Port:', port);
});
