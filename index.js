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
// crawData.test();
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
//           name: tenLinhMuc.replaceAll("-", ""),
//           link: link
//         });
//         linhMuc.save();
//       }
//     })
//   }
//   else {
//     console.log(error);
//   }
// });

// Crawl Du lieu giao xu
// const crawlDataGiaoXu = async () => {
//   const listGiaoHat = await GiaoHat.find({});
//   listGiaoHat.forEach((giaoHat) => {
//     request(giaoHat.link)
//     .then((htmlString) => {
//       const $ = cheerio.load(htmlString);
//       $('p').each((index, el) => {
//         const tenGiaoXu = $(el).find('a').text().trim();
//         const link = $(el).find('a').attr('href');
//         if(tenGiaoXu != undefined && tenGiaoXu.trim() != "") {
//           const giaoXu = new GiaoXu ({
//             name: tenGiaoXu,
//             link: link.replace("www.", ""),
//             linkGiaoHat: giaoHat.link,
//           })
//           console.log(giaoXu)
//           // giaoXu.save()
//         }
//       });
//     })

//     .catch((e, trace) => {
//       console.log(e);
//       console.log(trace)
//     })
//   });
// }

// const crawlLmChinhXu = async () => {
//   const ListGiaoXu = await GiaoXu.find({linkGiaoHat: "https://www.tonggiaophanhanoi.org/giao-hat-nam-dinh/"});
//   ListGiaoXu.forEach((giaoXu) => {
//     request(giaoXu.link)
//       .then((htmlString) => {
//         const $ = cheerio.load(htmlString);
//         $('p').each((index, el) => {
//           var text = "Linh mục";
//           var text2 = "chính xứ";
//           var text3 = "quản nhiệm"
//           // Đặt 2 text vì kéo về có &bnsp
//           if(($(el).text()).indexOf(text) != -1 && (($(el).text().toString()).indexOf(text2) != -1 || ($(el).text().toString()).indexOf(text3) != -1)) {
//             const lm = $(el).find('a').text().trim()
//             if(lm != undefined && lm!="") {
//               updateLmChinhXu(giaoXu._id, lm.replaceAll("-", ""))
//             }
//           }
//         });
//       })
//   })
// }

// const updateLmChinhXu = async (idGiaoxu, tenLm) => {
//   const filter = {_id: idGiaoxu}
//   const lm = await LinhMuc.findOne({name: tenLm})
//   if(lm == null) return;
//   const update = {linkLinhMuc: lm.link}
//   await GiaoXu.findOneAndUpdate(filter, update)
// }

// crawlLmChinhXu();
// crawlDataGiaoXu();

//Update Linh Muc Detail
// const updateLinhMucDetail = async () => {
//   const listLinhMuc = await LinhMuc.find({});
//   listLinhMuc.forEach((linhMuc, index) => {
//     setTimeout(() => {
//       const details = []
//       try {
//         axios(linhMuc.link).then((res) => {
//           const html = res.data;
//           const $ = cheerio.load(html);
//           $(".wp-block-column-is-layout-flow").each((index, el) => {
//             $(el).find('p').each((index, el) => {
//               details.push($(el).text());
//               update(linhMuc._id, details);
//             });
//           });
//         });
//       } catch (error) {
//         // console.log(error)
//       }
//     }, 1000 * (index + 1))
//   })
// }

// const update = async (id, detail) => {
//   const filter = {_id: id};
//   const update = {detail: detail};
//   try {
//     await LinhMuc.findOneAndUpdate(filter, update);
//     console.log(detail);
//   } catch (error) {
//     console.log(error);
//   }
// }

const updateGiaoXuDetail = async () => {
  const listGiaoXu = await GiaoXu.find({});
  listGiaoXu.forEach((giaoXu, index) => {
    setTimeout(() => {
      const details = []
      try {
        axios(giaoXu.link).then((res) => {
          const html = res.data;
          const $ = cheerio.load(html);
          $(".wp-block-column-is-layout-flow").each((index, el) => {
            $(el).find('p').each((index, el) => {
              details.push($(el).text());
              updateGiaoXu(giaoXu._id, details);
              console.log(details);
            });
          });
        });
      } catch (error) {
        console.log(error)
      }
    }, 1000 * (index + 1))
  })
}
const updateGiaoXu = async (id, detail) => {
  const filter = {_id: id};
  const update = {detail: detail};
  try {
    await GiaoXu.findOneAndUpdate(filter, update);
    console.log(detail);
  } catch (error) {
    console.log(error);
  }
}

updateGiaoXuDetail();

const app = express()
const port = 3000

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
})