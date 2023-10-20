const express = require('express')
const db = require('./src/config/db')
const cheerio = require('cheerio');
const request = require('request-promise');
// const GiaoHat = require('./src/models/GiaoHat');
const LinhMuc = require('./src/models/LinhMuc');


db.connect();
//Crawl dữ liệu các giáo hạt
// request('https://www.tonggiaophanhanoi.org/category/to-chuc-tgp/cac-giao-hat/', (error, response, html) => {
//   if(!error && response.statusCode == 200) {
//     const $ = cheerio.load(html); // load HTML

//     $('.post').each((index, el) => {
//       const tenGiaoHat = $(el).find('.entry-title a').text();
//       const link = $(el).find('.entry-title a').attr('href')
//       const giaoHat = new GiaoHat(
//         {
//           name: tenGiaoHat,
//           link: link
//         }
//       );
//       giaoHat.save();
//     })
//   }
//   else {
//     console.log(error);
//   }
// });

//Crawl Du lieu Linh Muc
// request('https://www.tonggiaophanhanoi.org/linh-muc-doan-tong-giao-phan-ha-noi-nam-2019//', (error, response, html) => {
//   if(!error && response.statusCode == 200) {
//     const $ = cheerio.load(html); // load HTML
//     $('p').each((index, el) => {
//       const tenLinhMuc = $(el).find('a').text().trim().replace("Lm.", "").trim();
//       const link = $(el).find('a').attr('href');
      
//       if(tenLinhMuc != undefined && tenLinhMuc.trim() != "") {
//         const linhMuc = new LinhMuc({
//           name: tenLinhMuc,
//           link: link
//         });
//         // linhMuc.save()
//       }
//     })
//   }
//   else {
//     console.log(error);
//   }
// });


const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})