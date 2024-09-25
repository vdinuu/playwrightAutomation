import { expect } from "@playwright/test";

class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator("span#productTitle");
    this.addToCartBtn = page.locator("input#add-to-cart-button");
    this.noThanksBtn = page.locator("span#attachSiNoCoverage");
    this.alert = page.locator("h1.a-size-medium-plus");
    this.goToCartBtn = page.locator("a[href*='sw_gtc']");
    this.productPrice = page.locator(
      "div.a-section span.reinventPricePriceToPayMargin"
    );
  }

  async validateProductDetails(productName) {
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

  async getProductPrice() {
    const price = await this.productPrice.first().textContent();
    return Number(price.trim().substring(1));
  }

  async verifyPrice(price) {
    expect(await this.getProductPrice()).toBe(price);
  }
}
module.exports = { ProductDetailsPage };
