const GRADESCOPE_LOGIN_URL = "https://gradescope.com/";
const GRADESCOPE_GRADE_URL = "https://gradescope.com/courses/11603/questions/373378/submissions/35579430/grade";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = class Grader {

  constructor(browser) {
    this.browser = browser;
  }

  async login(username, password) {
    this.page = await this.browser.newPage();
    await this.page.goto(GRADESCOPE_LOGIN_URL);
    await this.page.waitForSelector("#signin-form");
    await this.page.mainFrame().injectFile("./jquery-3.2.1.min.js");
    await this.page.evaluate((username, password) => {
      $("#email").val(username);
      $("#password").val(password);
      $("#signin-form").submit();
    }, username, password);
    await this.page.waitForSelector(".courseBox--name");
    const courses = await this.page.$eval(".courseBox--name", courses => courses.innerHTML);
    console.log(courses);
  }

  async grade() {
    await this.page.goto(GRADESCOPE_GRADE_URL);
    await this.page.waitForSelector("#rubric_item_1551237_key");
    for(let i = 0; i < 95; i++) {
      await this.page.click("#rubric_item_1551237_key");
      await sleep(2000);
      await this.page.click("#next_submission");
      await sleep(2000);
    }
  }

}
