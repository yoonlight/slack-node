import { mqLoad } from './loader/mq';
import { controller } from './loader/botkit';
async function load() {
  await mqLoad();
}

load();

controller.on('message', async (bot, message) => {
  await bot.reply(message, 'I heard a message!');
});
