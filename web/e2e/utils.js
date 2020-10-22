let accounts = {};

export const selector = {
  navigation: {
    transfers: '.main-nav-widget > .transfers',
    accounts: '.main-nav-widget > .accounts',
    logout: 'ul.navigation-header-links > li > a[href="/logout"]',
  },
  loginScreen: {
    loginButton: '.login-box button[type="submit"]',
    loginEmailField: '.login-box input[name="email"]',
    loginPasswordField: '.login-box input[name="password"]',
    loginErrorMsg: '.login-box p.error',
  },
  accountSummaryScreen: {
    header: '.panel-content > h1'
  },
  transfersScreen: {
    header: '.panel-content h1',
    newTransferButton: '#new-transfer-btn',
  },
  newTransferForm: {
    header: '.new-transfer h2',
    sourceAccountSelector: '#source-account',
    recipientAccountSelector: '#recipient-account',
    referenceField: 'input[name="reference"]',
    amountField: 'input[name="amount"]',
    currencySelector: '#currency',
    confirmTransferButton: '#confirm-transfer-button',
  }
};

export const testData = {
  transferAmount: 10000,
  sourceAccountCurrency: 'SGD',
  recipientAccountCurrency: 'USD',
  transferCurrency: 'SGD'
};

const exchangeRates = [{
  baseCurr: 'SGD',
  quoteCurr: 'USD',
  rate: 0.73,
}, {
  baseCurr: 'SGD',
  quoteCurr: 'GBP',
  rate: 0.57,
}, {
  baseCurr: 'USD',
  quoteCurr: 'SGD',
  rate: 1.36,
}, {
  baseCurr: 'USD',
  quoteCurr: 'GBP',
  rate: 0.78,
}, {
  baseCurr: 'GBP',
  quoteCurr: 'USD',
  rate: 1.29,
}, {
  baseCurr: 'GBP',
  quoteCurr: 'SGD',
  rate: 1.76,
}];

export const adjustForXR = (baseAmount, baseCurr, quoteCurr) => {
  if (baseCurr === quoteCurr) return baseAmount;

  const exchangeRate = exchangeRates.find(x => x.baseCurr === baseCurr && x.quoteCurr === quoteCurr);
  const { rate } = exchangeRate;
  return Math.round(baseAmount * rate);
};

/**
 * Scrapes the first transfer in a transfers list. The first transfer in the list is the most recent
 * @param page
 * @returns {Promise<{amount: number, currency}>}
 */
export const scrapeFirstTransfer = async (page) => {
  const transferDetails = await page.$$('.transfer-details');
  const rawDetails = await (await transferDetails[0].getProperty('innerText')).jsonValue();
  const rawAmount = rawDetails.split('Amount:')[1].trim();
  const currency = rawAmount.split(' ')[1];
  const amount = parseFloat(rawAmount.split(' ')[0].replace(',',''));
  return { currency, amount };
};

/**
 * Scrapes the first transaction in the account transaction list.
 * The first transaction in the list is the most recent
 * @param page
 * @param cellClassName {string} the cell className
 * @returns {Promise<{amount: number, currency}>}
 */
export const scrapeFirstTransaction = async (page, cellClassName) => {
  const selector = `.${cellClassName}`;
  const txDetails = await page.$$(selector);
  const rawAmount = await (await txDetails[0].getProperty('innerText')).jsonValue();
  return parseFloat(rawAmount.split(' ')[0].replace(',',''));
};

const confirmElementInnerText = async (page, selector, expectedText) => {
  await page.waitForSelector(selector);
  const text = await page.$eval(selector, e => e.innerText);
  expect(text).toBe(expectedText);
};

export const confirmAccountsScreen = async (page) => {
  const { accountSummaryScreen: { header }} = selector;
  await confirmElementInnerText(page, header, 'Account Summary');
};

export const confirmTransfersScreen = async (page) => {
  const { transfersScreen: { header }} = selector;
  await confirmElementInnerText(page, header, 'Transfers');
};

export const confirmLoginScreen = async (page) => {
  const { loginScreen: { loginButton }} = selector;
  await confirmElementInnerText(page, loginButton, 'LOG IN NOW');
};

export const confirmNewTransferScreen = async (page) => {
  const { newTransferForm: { header } } = selector;
  await confirmElementInnerText(page, header, 'New transfer between accounts');
};

export const loginWithCredentials = async (page, email, password) => {
  const { loginScreen: { loginEmailField, loginPasswordField, loginButton } } = selector;
  await page.waitForSelector(loginEmailField);
  await page.type(loginEmailField, email);
  await page.type(loginPasswordField, password);
  await page.click(loginButton);
};

/**
 * Record the account balance in the accountBalances map from the raw value
 * @param {string} rawBalance - in the format 194,272.84 USD
 */
export const recordAccountOpeningBalances = (rawBalance, id) => {
  const currency = rawBalance.split(' ')[1];
  const openingBalance = parseFloat(rawBalance.split(' ')[0].replace(',',''));
  accounts[currency] = { openingBalance, id };
};

export const recordAccountClosingBalances = (rawBalance, id) => {
  const currency = rawBalance.split(' ')[1];
  const closingBalance = parseFloat(rawBalance.split(' ')[0].replace(',',''));
  console.log(`setting closingBalance=${closingBalance} for ${currency}`);
  accounts[currency] = { ...accounts[currency], closingBalance };
};

export const getAccountId = currency => accounts[currency].id;

export const scrapeAccountBalances = async (page, callback) => {
  const accountBalances = await page.$$('.account-balance');
  for (let i = 0; i < accountBalances.length; i++) {
    const rawBalance = await (await accountBalances[i].getProperty('innerText')).jsonValue();
    const accountId = await (await accountBalances[i].getProperty('id')).jsonValue();
    callback(rawBalance, accountId);
  }
  console.log(`accounts = ${JSON.stringify(accounts)}`);
};

export const getAccountListItemSelector = currency => {
  const id = getAccountId(currency);
  return `.panel-content a.list-group-item[href="/panel/accounts/${id}"]`;
};

export const getOpeningClosingDelta = currency => {
  return accounts[currency].closingBalance - accounts[currency].openingBalance;
};

export const captureScreenshot = async (page, entity) => {
  const path = `./e2e/screenshots/${entity}.jpg`;
  return await page.screenshot({ path, fullPage: true });
};
