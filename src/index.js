import { mqLoad } from './loader/mq';
import { controller, adapter } from './loader/botkit';
async function load() {
  await mqLoad();
}

load();
