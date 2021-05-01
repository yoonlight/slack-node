import { mqLoad } from './loader/mq';
import botkit from './loader/botkit';
import express from 'express';
import { expressLoader } from './loader/express';
const app = express();
expressLoader(app);

app.listen(3002, () => {
  console.log('listen');
});
botkit(app);
async function load() {
  await mqLoad();
}

load();
