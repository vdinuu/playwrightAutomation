import { test } from "@playwright/test";
const { PageManager } = require("../pages/PageManager");

let context, page;
const url = "https://www.amazon.com/";
let testData;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await page.goto(url);
  testData = JSON.parse(
    JSON.stringify(require("../test-data/AmazonTests.json"))
  );
});

test.skip("TC_01 - Amazon Invalid login", { tag: "@smoke" }, async () => {
  const data = testData.TC_01;
  const pageManager = new PageManager(page);
  const homePage = await pageManager.getHomePage();
  await homePage.navigateToLoginPage();
  const loginPage = await pageManager.getLoginPage(page);
  await loginPage.loginToApp(data.userName, data.password);
  await loginPage.validateLoginError(data.errorText);
});

//Search Iphone and the add product with text Apple iPhone 13 to cart
test("TC_02 - Amazon search", { tag: "@smoke" }, async () => {
  const data = testData.TC_02;
  const pageManager = new PageManager(page);
  const homePage = await pageManager.getHomePage(page);
  await homePage.searchProduct(data.productName);
  await homePage.selectDesiredProduct(data.desiredProduct);
  const productDetailsPage = await pageManager.getProductDetailspage(page);
  await productDetailsPage.validateProductDetails(data.desiredProduct);
  await productDetailsPage.addProductToCart();
  await productDetailsPage.goToCart();
  const cartPage = await pageManager.getCartPage(page);
  await cartPage.verifyProductTitleInCart(data.desiredProduct);
});

//search amazon for a product and select the cheapest item from first page and add to cart
test.only(
  "TC_03 Amazon search and select product with lowest price",
  { tag: "@smoke" },
  async () => {
    const data = testData.TC_03;
    const pageManager = new PageManager(page);
    const homePage = await pageManager.getHomePage(page);
    await homePage.searchProduct(data.productName);
    console.log(data.productName);
    data.lowestPrice = await homePage.selectPdtWithLowestPrice();
    console.log(data.lowestPrice);
    const productDetailsPage = await pageManager.getProductDetailspage(page);
    await productDetailsPage.verifyPrice(data.lowestPrice);
  }
);
