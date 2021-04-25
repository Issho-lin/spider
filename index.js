const originRequest = require('request')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')
const fs = require('fs')

const request = (url, callback) => {
  return new Promise(resolve => {
    originRequest(url, {
      encoding: null
    }, (err, res, body) => {
      resolve(body)
    })
  })
}

for (let i = 103000; i < 103550; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`
  request(url).then(body => {
    const html = iconv.decode(body, 'gb2312')
    const $ = cheerio.load(html)
    const text = $('.title_all h1').text()
    fs.appendFileSync('data.txt', text + '\n')
  })
}
