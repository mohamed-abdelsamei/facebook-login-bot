const facebook = require('./facebook');
require('dotenv').config()

const username = process.env.FACEBOOK_USERNAME;
const password = process.env.FACEBOOK_PASSWORD;

(async () => {
  await facebook.initialize()
  await facebook.login(username, password)

})()