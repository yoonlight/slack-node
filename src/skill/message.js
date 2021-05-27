const knock = async ({ message, say }) => {
  await say(`_Who's there?_`);
};
const hello = async ({ message, say }) => {
  try {
    console.log('값 받음');
    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hey there <@${message.user}>!`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
            },
            action_id: 'button_click',
          },
        },
      ],
      text: `Hey there <@${message.user}>!`,
    });

  } catch (e) {
    console.error(e);
  }
};
const message = {
  knock,
  hello,
};

export { message };
