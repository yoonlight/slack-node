import mqLoad from './mq';
import boltLoad from './bolt';

async function load() {
  await mqLoad();
  await boltLoad();
}

export default load;
