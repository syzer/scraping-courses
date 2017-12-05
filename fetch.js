const fs = require('fs')
const fetch = require('node-fetch')

fetch('https://cloud.frontendmasters.com/savage-a/2015/08/19/webm/720/1.webm?Expires=1512451069&Signature=nLrGOqhzXpFLdVulwkWOWJWE5NQL3TcRe5RkgUGHqV9h3fCRNS~0hDrLfaXsK5p1oI-oJCi4nDwuGgU-fi3KgxOtFZKq7KYPclA0pBP06CY4sUN8wK9YUiHfXC8EKdbcXkoPIzho-sfnP8ucIJSuxVUSQGnR4gHCGMmET1jXYItLp5Dc-TDcwpjqLmVMN9ArapiDfQ7A43FH3fEIlZZ7vjp~TjicTNK-T-F3Ff3-v0ebNLBpOSfGqgKQ3SeUCdDhICV65BK4PfoN9cgC4YYBCFTxTQU-cC0hyot1rFrMc6US8A~LRIpJoHrWaFNUjIPb2KSKKNC-HWv3aylft4q-dg__&Key-Pair-Id=APKAJWB4SBTOPQN6G6BQ')
  .then((res) =>
    res.body.pipe(fs.createWriteStream('./test.mp4'))
  )