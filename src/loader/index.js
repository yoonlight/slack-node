import mqLoad from './mq';
import { SlackApp } from './bolt';

const load = async () => {
  await mqLoad();
  const slack = new SlackApp();
  await slack.listen();
};

export default load;
