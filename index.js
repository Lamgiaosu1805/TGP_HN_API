const express = require('express')
const db = require('./src/config/db')
const route = require('./src/routes/route');
const morgan = require('morgan');
const { crawlLmChinhXu } = require('./src/tools/crawlData');
const app = express()
const port = 3000;
const url = "/api/v1"


db.connect();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())
app.use(morgan('dev'))

route(app, url);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})