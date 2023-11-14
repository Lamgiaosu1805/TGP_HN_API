const { default: axios } = require("axios");
const cheerio = require('cheerio');

class GiaoLyController {

    //Giao ly tin mung thanh mattheu
    getData(req, res, next) {
        let option = ""
        if(req.params.option === "baihoc") {
            option = 0
        }
        else if(req.params.option === "loichua") {
            option = 1
        }
        if(typeof option == 'number') {
            const data = []
            try {
                axios('https://www.tonggiaophanhanoi.org/dan-nhap-tin-mung-theo-thanh-mat-theu/')
                    .then(resp => {
                        const html = resp.data;
                        const $ = cheerio.load(html);
                        $('.elementor-tab-content').each((index, el) => {
                            if(index == option) {
                                $(el).find('a').each((index, el) => {
                                    const title = $(el).text();
                                    const url = $(el).attr('href')
                                    data.push({
                                        title: title,
                                        url: url
                                    })
                                });
                                res.json({
                                    code: 200,
                                    data: data
                                })
                            }
                        })
                    })
                    .catch(e => console.log(e))
            } catch (error) {
                console.log(error)
                res.json({
                    code: 500,
                    error: error
                })
            }
        }
        else {
            res.json({
                code: 404,
                error: "Page not found"
            })
        }
    }

    getDetail(req, res, next) {
        const url = req.body.url;
        const title = [];
        const content = [];
        let link = ""
        try {
            axios(url).then(resp => {
                const html = resp.data;
                const $ = cheerio.load(html);
                $('.elementor-widget-container').each((index, el) => {
                    if(index == 1) {
                        $(el).find('.has-text-align-center').each((index, el) => {
                            title.push($(el).text())
                        })
                        $(el).find('p').each((i, el) => {
                            content.push($(el).text())
                        })
                        if($(el).find('iframe').attr('data-src')){
                            link = $(el).find('iframe').attr('data-src')
                        }
                    }
                });
                res.json({
                    code: 200,
                    title: title,
                    content: content,
                    link: link
                })
            })
            .catch(next)
        } catch (error) {
            console.log(error)
            res.json({
                code: 500,
                error: error
            })
        }
    }
}

module.exports = new GiaoLyController;