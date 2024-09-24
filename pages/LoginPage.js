import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#ap_email");
    this.continueBtn = page.locator("input#continue");
    this.password = page.locator("#ap_password");
    this.signInBtn = page.locator("#signInSubmit");
    this.loginError = page.locator("div.a-alert-content span");
  }

  async loginToApp(userName, pwd) {
    await this.username.fill(userName);
    await this.continueBtn.click();
    await this.password.fill(pwd);
    await this.signInBtn.click();
  }

  async validateLoginError(errorMessage) {
    await this.loginError.textContent();
    expect(await this.loginError.textContent()).toContain(errorMessage);
  }
}
module.exports = { LoginPage };
