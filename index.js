const dotenv = require('dotenv').config()
// const url = 'https://frontendmasters.com/courses/functional-javascript-v2/composition-introduction/'
const url = 'https://frontendmasters.com/'
const puppeteer = require('puppeteer')

const loginKey = 'wordpress_logged_in_323a64690667409e18476e5932ed231e'
const { COOKIES } = dotenv.parsed
const cookies = COOKIES.split(';')
.map(line => line.trim().split('='))
.filter((arr) => arr.includes(loginKey))
  .map(([name, value]) => ({
    url,
    name,
    value
  }))

  await Promise.all(cookies.map(cookie => page.setCookie(cookie)))

  await page.goto(url)


  const content = await page.content()

  // console.log(content)
  // await page.evaluate(() => console.log(`url is ${location.href}`))

  // await page.screenshot({ path: 'example.png' })

  // await browser.close()
})()
