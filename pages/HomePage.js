class HomePage {
  constructor(page) {
    this.page = page;
    this.signInLink = page.locator("#nav-link-accountList");
    this.searchBox = page.locator("#twotabsearchtextbox");
    this.searchBtn = page.locator("#nav-search-submit-button");
    this.products = page.locator(
      "span[class='a-size-medium a-color-base a-text-normal']"
    );
    this.productPrices = page.locator(
      ".puisg-col-inner div[data-cy='price-recipe'] span.a-price:not([data-a-strike='true']) span.a-offscreen"
    );
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

  async selectPdtWithLowestPrice() {
    await this.page.waitForLoadState("load");
    await this.productPrices.last().waitFor();
    const count = await this.productPrices.count();
    const firstPrice = await this.productPrices.first().textContent();
    let lowPrice = Number(firstPrice.substring(1));
    console.log(firstPrice);
    let lowIndex = 0;
    for (let i = 0; i < count; i++) {
      let value = await this.productPrices.nth(i).textContent();
      let price = Number(value.substring(1));
      console.log("In loop:" + price);
      if (price < lowPrice) {
        lowPrice = price;
        lowIndex = i;
      }
    }
    console.log("Lowest price is : " + lowPrice);
    console.log("Lowest index is : " + lowIndex);
    await this.products.nth(lowIndex).click();
    await this.page.waitForLoadState("load");
    return lowPrice;
  }
}
module.exports = { HomePage };
