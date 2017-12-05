const fs = require('fs')
const _ = require('lodash')
const links = fs.readFileSync('./correct_links.txt', 'utf8')
const progs = _.chain(links.split('\n'))
  .filter((line) => line)
  .filter((line) => line.match(/cloud.frontend/))
  .filter((line) => line.match(/\d+.webm/))
  .uniq()
  .map(str => str.substring(0, str.length - 1))
  .map((str) => {
    const num = parseInt(str.split('.webm').shift().split('/').pop(), 10) + _.uniqueId('-r')
    return str + ' --output ' + num + '.webm'
  })
  .value()
  .join('\n')

console.log(progs)
