import express, { Router } from 'express'
import dotenv from 'dotenv'
import schedule from 'node-schedule'
import { WebClient } from '@slack/web-api'
import api from './router/index.js'

dotenv.config()
const web = new WebClient(process.env.SLACK_TOKEN)
const app = express()
async () => {
  try {
    const list = await web.channels.list('general')
    console.log(list)
  } catch (error) {
    console.log(error.data)
  }
}

app.use('/api', api)
app.get('/', (req, res)=> {
  res.send('hello world!')
})
app.listen(process.env.SERVER_PORT, () => {
  console.log('server listening to', process.env.SERVER_PORT)
})

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'D01NLTF7TP1';

(async () => {
  try {
    // See: https://api.slack.com/methods/chat.postMessage
    const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });

    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  } catch (error) {
      console.log(error.data);
  }
})()
