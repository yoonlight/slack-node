import amqp from 'amqplib';
import { WebClient } from '@slack/web-api';

const env = process.env;
const token = env.SLACK_TOKEN;
const convoId = env.SLACK_CONVERSATION_ID;
const rabbitMQ_URL = env.RABBITMQ_URL;
const web = new WebClient(token);

async function mqLoad() {
  const q = 'slack';
  const open = amqp.connect(rabbitMQ_URL);

  try {
    const conn = await open;
    const ch = await conn.createChannel();
    let ok = ch.assertQueue(q, { durable: false });
    ok = ok.then(() => {
      return ch.consume(q, async function (msg) {
        if (msg !== null) {
          console.log(' [x] Received %s', msg.content.toString());
          try {
            // See: https://api.slack.com/methods/chat.postMessage
            const res = await web.chat.postMessage({
              channel: convoId,
              blocks: [
                {
                  type: 'header',
                  text: {
                    type: 'plain_text',
                    text: 'Todo List update',
                    emoji: true,
                  },
                },
              ],
              attachments: [
                {
                  text: msg.content.toString(),
                },
              ],
            });

            // `res` contains information about the posted message
            console.log('Message sent: ', res.ts);
          } catch (error) {
            console.log(error.data);
          }
          ch.ack(msg);
        }
      });
    });
    return ok.then(() => {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');
    });
  } catch (error) {
    console.warn(error);
  }
}

export default mqLoad;
