const express = require('express')
const db = require('./src/config/db')

db.connect();



const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})