import dotenv from 'dotenv';
// import schedule from 'node-schedule'
import { WebClient } from '@slack/web-api';
import amqplib from 'amqplib/callback_api';

dotenv.config();
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);
// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const convoId = process.env.SLACK_CONVERSATION_ID;
const text = 'Hello there';
(async () => {
  try {
    // See: https://api.slack.com/methods/chat.postMessage
    const res = await web.chat.postMessage({ channel: convoId, text: text });

    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  } catch (error) {
    console.log(error.data);
  }
})();

amqplib.connect(process.env.RABBITMQ_URL, (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    const queue = 'slack';
    channel.assertQueue(queue, { durable: false });
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
    channel.consume(queue, function (msg) {
      console.log(' [x] Received %s', msg.content.toString());
    });
  });
});
