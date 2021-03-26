import dotenv from 'dotenv';
import { WebClient } from '@slack/web-api';
import amqplib from 'amqplib/callback_api';

dotenv.config();
const env = process.env;
const token = env.SLACK_TOKEN;
const convoId = env.SLACK_CONVERSATION_ID;
const rabbitMQ_URL = env.RABBITMQ_URL;
const web = new WebClient(token);

amqplib.connect(rabbitMQ_URL, (error0, connection) => {
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
    channel.consume(
      queue,
      async function (msg) {
        console.log(' [x] Received %s', msg.content.toString());
        try {
          // See: https://api.slack.com/methods/chat.postMessage
          const res = await web.chat.postMessage({
            channel: convoId,
            text: msg.content.toString(),
          });

          // `res` contains information about the posted message
          console.log('Message sent: ', res.ts);
        } catch (error) {
          console.log(error.data);
        }
      },
      {
        noAck: true,
      },
    );
  });
});
