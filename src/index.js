const puppeteer = require('puppeteer');

const Grader = require('./grader.js');
const config = require('../config');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const grader = new Grader(browser);
  await grader.login(config.gradescope.username, config.gradescope.password);
  await grader.grade();
})();