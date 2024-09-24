import { test } from "@playwright/test";
const { PageManager } = require("../pages/PageManager");

const userName = "test@gmail.com";
const pwd = "TestPassword";
let context, page;
const url = "https://www.amazon.com/";
const productName = "iphone";
const desiredProduct = "Apple iPhone 13";

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(url);
});

test("Amazon Invalid login", { tag: "@smoke" }, async () => {
  const pageManager = new PageManager(page);
  const homePage = await pageManager.getHomePage();
  await homePage.navigateToLoginPage();
  const loginPage = await pageManager.getLoginPage(page);
  await loginPage.loginToApp(userName, pwd);
  await loginPage.validateLoginError("incorrect");
});

//Search Iphone and the add product with text Apple iPhone 13 to cart
test.only("Amazon search", { tag: "@smoke" }, async () => {
  const pageManager = new PageManager(page);
  const homePage = await pageManager.getHomePage(page);
  await homePage.searchProduct(productName);
  await homePage.selectDesiredProduct(desiredProduct);
  const productDetailsPage = await pageManager.getProductDetailspage(page);
  await productDetailsPage.validateProductDetails(desiredProduct);
  await productDetailsPage.addProductToCart();
  await productDetailsPage.goToCart();
  const cartPage = await pageManager.getCartPage(page);
  await cartPage.verifyProductTitleInCart(desiredProduct);
  //   await page.pause();
});
