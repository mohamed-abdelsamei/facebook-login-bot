const puppeteer = require('puppeteer');
const baseUrl = () => `https://www.facebook.com`
const messagesUrl = () => `https://www.facebook.com/messages/t/`
const selectors = {
  loginEmail: 'input[name="email"]',
  loginPass: 'input[name="pass"]',
  loginBtn: '#loginbutton',
  messagesBtn: 'a[name="mercurymessages"]',
  sellAllMessages: '#MercuryJewelFooter > div > a:nth-child(1)'
}

const self = {
  browser: null,
  pages: null,
  initialize: async () => {
    self.browser = await puppeteer.launch({
      headless: false
    })

    self.pages = await self.browser.newPage()
    await self.pages.setViewport({
      width: 1050,
      height: 900
    })

  },
  login: async (username, password) => {
    await self.pages.goto(baseUrl(), { waitUntil: 'networkidle0' })
    let { loginEmail, loginPass, loginBtn } = selectors
    await self.pages.type(loginEmail, username, { delay: 30 })
    await self.pages.type(loginPass, password, { delay: 30 })
    await self.pages.click(loginBtn)
    await self.pages.waitForNavigation();
    await self.pages.click('body')
  },
  openMessages: async () => {
    let { messagesBtn, sellAllMessages } = selectors
    // open messages by accessing dom
    // await self.pages.click(messagesBtn)
    // await self.pages.click(sellAllMessages)

    //open messages by navigation
    await self.pages.goto(messagesUrl(), { waitUntil: 'networkidle0' })


  }
}

module.exports = self;

