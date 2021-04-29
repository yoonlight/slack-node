import { Botkit } from 'botkit';
import { SlackAdapter } from 'botbuilder-adapter-slack';

const adapter = new SlackAdapter({
  clientSigningSecret: process.env.SLACK_SIGNING_SECRET,
  botToken: process.env.SLACK_TOKEN,
});

const controller = new Botkit({
  adapter,
  // ...other options
});

export { controller };
