const dotenv = require('dotenv').config()
const url = 'https://frontendmasters.com/courses/functional-javascript-v2/composition-introduction/'
const puppeteer = require('puppeteer')

const { COOKIES: cookies } = dotenv.parsed

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 550 // slow down by 250ms
  })
  const page = await browser.newPage()
  await page.goto(url)
  // TODO cookies

  const content = await page.content()

  console.log(content)
  // await page.evaluate(() => console.log(`url is ${location.href}`))

  // await page.screenshot({ path: 'example.png' })

  // await browser.close()
})()
