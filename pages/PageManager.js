const { HomePage } = require("./HomePage");
const { LoginPage } = require("./LoginPage");
const { ProductDetailsPage } = require("./ProductDetailsPage");
const { cartPage, CartPage } = require("./CartPage");

class PageManager {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.productDetailsPage = new ProductDetailsPage(page);
    this.cartPage = new CartPage(page);
  }

  async getHomePage() {
    return this.homePage;
  }

  async getLoginPage() {
    return this.loginPage;
  }

  async getProductDetailspage() {
    return this.productDetailsPage;
  }

  async getCartPage() {
    return this.cartPage;
  }
}
module.exports = { PageManager };
