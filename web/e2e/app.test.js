import puppeteer from "puppeteer";
import {
  selector,
  testData,
  confirmAccountsScreen,
  confirmTransfersScreen,
  confirmLoginScreen,
  confirmNewTransferScreen,
  loginWithCredentials,
  scrapeFirstTransfer,
  scrapeFirstTransaction,
  recordAccountOpeningBalances,
  recordAccountClosingBalances,
  scrapeAccountBalances,
  getAccountListItemSelector,
  getOpeningClosingDelta,
  getAccountId,
  captureScreenshot,
  adjustForXR,
} from './utils';

const timeout = 10000;
const domain = 'http://localhost:3000';
const headless = false;

let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless });
  page = await browser.newPage();
  await page.goto(domain);
}, timeout);

afterAll(async () => {
  await page.close();
  await browser.close();
});

describe('Bank of Sentosa UI component tests', () => {
  test("Website loads successfully", async () => {
    const title = await page.title();
    expect(title).toBe("Bank of Sentosa");
    await confirmLoginScreen(page);
  }, timeout);

  test("Invalid user login attempt should fail", async () => {
    const { loginScreen: { loginErrorMsg }} = selector;
    await loginWithCredentials(page, 'invalidUser@nowhere.com', 'passw0rd');
    await page.waitForSelector(loginErrorMsg);
    const errorMsg = await page.$eval(loginErrorMsg, e => e.innerText);
    expect(errorMsg).toBe('Invalid email address or password');
  }, timeout);

  test("Valid user login attempt should direct user to accounts summary", async () => {
    await loginWithCredentials(page, 'dan.larimer@eos.io', 'passw0rd');
    await confirmAccountsScreen(page);
    // Extract the account balances
    await scrapeAccountBalances(page, recordAccountOpeningBalances);
    await captureScreenshot(page,'opening-accounts');
  }, timeout);

  test("Clicking the new transfer button displays the new transfer form", async () => {
    const { transfersScreen: { newTransferButton }, navigation } = selector;
    await page.click(navigation.transfers);
    await confirmTransfersScreen(page);
    await page.waitForSelector(newTransferButton);
    await page.click(newTransferButton);
    await confirmNewTransferScreen(page);
  }, timeout);

  test("Submitting a new transfer should navigate the user to the accounts summary screen, with updated account balances", async () => {
    // Transfer 10,000 SGD from the SGD account to the USD account
    const { transferAmount, sourceAccountCurrency, recipientAccountCurrency, transferCurrency } = testData;
    const { newTransferForm: { sourceAccountSelector, recipientAccountSelector, currencySelector, referenceField, amountField, confirmTransferButton } } = selector;
    await page.select(sourceAccountSelector, getAccountId(sourceAccountCurrency));
    await page.select(recipientAccountSelector, getAccountId(recipientAccountCurrency));
    await page.type(referenceField, 'A dummy reference');
    await page.type(amountField, String(transferAmount));
    await page.select(currencySelector, transferCurrency);
    await captureScreenshot(page,'transfer-form');
    await page.click(confirmTransferButton);
    await confirmAccountsScreen(page);
  }, timeout);

  test("On the accounts summary screen, the account balances should have updated", async () => {
    // Scrape the account closing balances
    const { transferAmount, sourceAccountCurrency, recipientAccountCurrency, transferCurrency } = testData;
    await scrapeAccountBalances(page, recordAccountClosingBalances);
    await captureScreenshot(page,'closing-accounts');
    const sourceAccountDelta = getOpeningClosingDelta(sourceAccountCurrency);
    const recipientAccountDelta = getOpeningClosingDelta(recipientAccountCurrency);
    expect(sourceAccountDelta).toBe(-transferAmount); // SGD account should have 10k less
    const amountInTxCurr = adjustForXR(transferAmount, transferCurrency, recipientAccountCurrency);
    expect(Math.round(recipientAccountDelta)).toBe(Math.round(amountInTxCurr)); // SGD account should have 10k less
  }, timeout);

  test("Transfer record is created", async () => {
    const { transferAmount, transferCurrency } = testData;
    await page.click(selector.navigation.transfers);
    await confirmTransfersScreen(page);
    const { currency, amount } = await scrapeFirstTransfer(page);
    expect(currency).toBe(transferCurrency);
    expect(amount).toBe(transferAmount);
    await captureScreenshot(page,'transfer-records');
  }, timeout);

  test("Corresponding Debit and Credit transactions are generated", async () => {
    const { sourceAccountCurrency, recipientAccountCurrency, transferCurrency, transferAmount } = testData;
    await page.click(selector.navigation.accounts);
    await confirmAccountsScreen(page);

    // Click on the source account
    const sourceAccountListItem = getAccountListItemSelector(sourceAccountCurrency);
    await page.waitForSelector(sourceAccountListItem);
    await page.click(sourceAccountListItem);
    await captureScreenshot(page,'source-account-transactions');
    const withdrawl = await scrapeFirstTransaction(page, 'withdrawl');
    let amountInTxCurr = adjustForXR(transferAmount, transferCurrency, sourceAccountCurrency);
    expect(withdrawl).toBe(amountInTxCurr);

    // Select the recipient account
    await page.click(selector.navigation.accounts);
    await confirmAccountsScreen(page);
    const recipientAccountListItem = getAccountListItemSelector(recipientAccountCurrency);
    await page.waitForSelector(recipientAccountListItem);
    await page.click(recipientAccountListItem);
    await captureScreenshot(page,'recipient-account-transactions');
    const deposit = await scrapeFirstTransaction(page, 'deposit');
    amountInTxCurr = adjustForXR(transferAmount, transferCurrency, recipientAccountCurrency);
    expect(deposit).toBe(amountInTxCurr);
  }, timeout);

  test("Clicking logout navigates the user to the login screen", async () => {
    await page.click(selector.navigation.logout);
    await confirmLoginScreen(page);
  }, timeout);
});
