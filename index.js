const dotenv = require('dotenv').config()
const url = 'https://frontendmasters.com/'
const puppeteer = require('puppeteer')

const { COOKIES } = dotenv.parsed
const cookies = COOKIES.split(';')
  .map(line => line.trim().split(/=/))
  .map(([name, ...values]) => ({
    url: url,
    name,
    value: values.join('='),
  }))

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 550 // slow down by 250ms
  })
  const page = await browser.newPage()

  await Promise.all(cookies.map(cookie => page.setCookie(cookie)))

  await page.goto(url)


  const content = await page.content()

  console.log(content)
})()
