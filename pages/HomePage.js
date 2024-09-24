class HomePage {
  constructor(page) {
    this.page = page;
    this.signInLink = page.locator("#nav-link-accountList");
    this.searchBox = page.locator("#twotabsearchtextbox");
    this.searchBtn = page.locator("#nav-search-submit-button");
    this.products = page.locator("h2 span.a-size-medium");
  }

  async navigateToLoginPage() {
    await this.signInLink.click();
  }

  async searchProduct(productName) {
    await this.searchBox.fill(productName);
    await this.searchBtn.click();
  }

  async selectDesiredProduct(desiredProduct) {
    await this.page.waitForLoadState("load");
    await this.products.last().waitFor();
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      let productLabel = await this.products.nth(i).textContent();
      if (productLabel.includes(desiredProduct)) {
        await this.products.nth(i).click();
        await this.page.waitForLoadState("load");
        break;
      }
    }
  }
}
module.exports = { HomePage };
