import doenv from 'dotenv'
doenv.config()
import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
