const express = require('express')
const db = require('./src/config/db')
const cheerio = require('cheerio');
const request = require('request-promise');
const GiaoHat = require('./src/models/GiaoHat');
const LinhMuc = require('./src/models/LinhMuc');
const GiaoXu = require('./src/models/GiaoXu');
const crawData = require('./src/tools/crawlData');
const { default: axios } = require('axios');

db.connect();


const app = express()
const port = 3000

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
})