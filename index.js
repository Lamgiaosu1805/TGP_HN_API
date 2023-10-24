const express = require('express')
const db = require('./src/config/db')
const route = require('./src/routes/route')
const app = express()
const port = 3000;
const url = "/api/v1"


db.connect();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())

route(app, url);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})