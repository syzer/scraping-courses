const fs = require('fs')
const fetch = require('node-fetch')
const _ = require('lodash')
const cheerio = require('cheerio')
const { login } = require('./lib/login')

async function scrapeCourse(page) {
  try {
    const course = '#javascript-basics > div.s-vflex-outer > div.cta > a'
    await page.waitForSelector(course)
    await page.click(course)
    await page.waitFor(1 * 1000)
    // await page.waitForNavigation()

    throw 'kopytko'

    const forFree = 'body > div.s-vflex-outer > div > section.CourseFrame > div > a.Button.ButtonLarge.ButtonRed'
    await page.click(forFree)
    await page.waitFor(2000)

    const titlesSelector = 'body > div.AppContainer.L-flex-column.lessonlist-open > div.PlayerOuter.L-flex-greedy-outer > div > div.LessonList.L-flex-toggle.active > ol > li > a.lesson'
    const elem = (id) => `body > div.AppContainer.L-flex-column.lessonlist-open > div.PlayerOuter.L-flex-greedy-outer > div > div.LessonList.L-flex-toggle.active > ol > li:nth-child(${id})`
    const titlesCount = await page.$$eval(titlesSelector, divs => divs.length)
    console.log('found links:', titlesCount)

    const titlesTexts = Array.from(_.range(1, titlesCount), (i, _) => page.$eval(elem(i), el => el.innerHTML))
    const sideNav = await Promise.all(titlesTexts)

    // don't ask
    const titles = sideNav
      .map(cheerio.load)
      .map($ => $('.title').text())
      .filter(e => e)
    console.log(titles)

    const elemLink = (id) => `body > div.AppContainer.L-flex-column.lessonlist-open > div.PlayerOuter.L-flex-greedy-outer > div > div.LessonList.L-flex-toggle.active > ol > li:nth-child(${id}) > a`

    await Promise.all(titles.map(async (e, i) => {
      await page.click(elemLink(i + 1))
      await page.waitFor(1000)

      const url = await page.$eval('#vjs_video_3_html5_api', e => e.src)

      await fetch(url)
        .then(res =>
          res.body.pipe(fs.createWriteStream(`./data/${_.padStart(i, 2, '0')}.${titles[i]}.mp4`)))
        .catch(console.error)
    }))

  } catch (err) {
    console.error(err)
  }

}

(async () => {
  const page = await login()
  await scrapeCourse(page)
  console.log('DONE')
})()
