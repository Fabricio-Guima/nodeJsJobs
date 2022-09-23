import doenv from 'dotenv'
doenv.config()
import express from 'express'
import { Candidate } from './models/candidate'
const app = express()

const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'ok' }))

app.use(router)

router.get('/candidates', async (req, res) => {
  const candidates = await Candidate.findAll()

  res.status(200).json({ candidates })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
