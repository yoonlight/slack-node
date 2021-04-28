import { mqLoad } from './loader/mq';

async function load() {
  await mqLoad();
}

load();
