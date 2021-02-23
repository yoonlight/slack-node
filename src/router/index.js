import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('list all messages')
})

router.get('/:id', (req, res) => {
  res.send(`show ${req.params.id}'s message`)
})

router.post('/', (req, res) => {
  res.send('create message')
})

router.patch('/:id', (req, res) => {
  res.send(`update ${req.params.id}'s message`)
})

router.delete('/:id', (req, res) => {
  res.send(`delete ${req.params.id}'s message`)
})

export default router
