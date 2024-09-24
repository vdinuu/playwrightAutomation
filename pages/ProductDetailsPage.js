import { expect } from "@playwright/test";

class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator("span#productTitle");
    this.addToCartBtn = page.locator("input#add-to-cart-button");
    this.noThanksBtn = page.locator("span#attachSiNoCoverage");
    this.alert = page.locator("h1.a-size-medium-plus");
    this.goToCartBtn = page.locator("a[href*='sw_gtc']");
  }

  async validateProductDetails(productName) {
    // await this.productTitle.waitFor();
    expect(await this.productTitle.textContent()).toContain(productName);
  }

  async addProductToCart() {
    await this.addToCartBtn.first().click();
    await this.page.waitForLoadState("load");
    await this.noThanksBtn.click();
    expect(await this.alert.textContent()).toContain("Added to Cart");
  }

  async goToCart() {
    await this.goToCartBtn.click();
    await this.page.waitForLoadState("load");
  }
}
module.exports = { ProductDetailsPage };
