const fs = require('fs')
const cheerio = require('cheerio')
const file = fs.readFileSync(process.argv[2], 'utf8')
const $ = cheerio.load(file)
const text = $('div.title')
  .map((i, el) => $(el).text()).get()
  .map((s, i) => ({ [i]: s.trim() }))
  .reduce((b, c) => ({
    ...b,
    ...c,
  }))

console.log(text)
