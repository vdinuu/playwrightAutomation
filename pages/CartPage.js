import { expect } from "@playwright/test";
class CartPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator("span.a-truncate-cut");
  }

  async verifyProductTitleInCart(productName) {
    expect(await this.productTitle.textContent()).toContain(productName);
  }
}
module.exports = { CartPage };
