// this do login
// do not use when you do not wanna login
const puppeteer = require('puppeteer')
const creds = require('./config')

const { user, pass } = creds()

async function login() {
  let page
  try {
    const browser = await puppeteer.launch({
      headless: false,
      // slowMo: 5 // slow down by 250ms
    })
    page = await browser.newPage()
    await page.goto('https://frontendmasters.com/login/')

    const username = '#username'
    const password = '#password'
    const loginButton = '#loginForm > button'

    await page.waitForSelector(username)
    await page.click(username)
    await page.type(username, user)

    await page.waitForSelector(password)
    await page.click(password)
    await page.type(password, pass)

    await page.click(loginButton)

    await page.waitForNavigation()
  } catch (err) {
    console.error(err)
  }
  return page
}

module.exports = { login }
