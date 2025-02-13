import express from 'express'
import {PORT} from './config/env.js'
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to Clinic Management API</h1>')
})

app.listen(PORT, () => {
    console.log(`Clinic Management API running on http://localhost:${PORT}.`)
})
