require('module-alias/register');
const assert = require('assert');
const { dummyData } = require('./dummyData');
const { dropDB, openConnection } = require('@db');
const { User, Account, Transfer, Transaction, ExchangeRate } = require('@models');
const { createUsers, createAccounts, createTransfers, createExchangeRates } = require('./populate');

const MONGO_ID_LENGTH = 24;
const expectedAccountEntries = dummyData.users.length * dummyData.accounts.length;
const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

// runs before all tests in the block.
before(() => {
  dropDB();
  openConnection();
});

let users;
let accounts;
let transfers;
let exchangeRates;

describe('createExchangeRates()', () => {
  it("generated xr records should contain generated ids", async () => {
    exchangeRates = await createExchangeRates();
    const xrIds = exchangeRates.map(x => x._id);
    assert.strictEqual(xrIds.length, dummyData.exchangeRates.length);
    assert.strictEqual(String(xrIds[0]).length, MONGO_ID_LENGTH);
    assert.strictEqual(String(xrIds[1]).length, MONGO_ID_LENGTH);
  }).timeout(15000); // 15 secs

  it("countDocuments", async () => {
    const documentCount = await ExchangeRate.countDocuments();
    assert.strictEqual(documentCount, 6);
  });
});

describe('createUsers()', () => {
  it("generated user records should contain generated ids", async () => {
    users = await createUsers();
    const userIds = users.map(x => x._id);
    assert.strictEqual(userIds.length, dummyData.users.length);
    assert.strictEqual(String(userIds[0]).length, MONGO_ID_LENGTH);
    assert.strictEqual(String(userIds[1]).length, MONGO_ID_LENGTH);
  }).timeout(15000); // 15 secs

  it("countDocuments", async () => {
    const documentCount = await User.countDocuments();
    assert.strictEqual(documentCount, 2);
  });
});

describe('createAccounts()', () => {
  it("generated account records should contain generated ids", async () => {
    accounts = await createAccounts(users);
    const accountIds = accounts.map(x => x._id);
    assert.strictEqual(accountIds.length, expectedAccountEntries);
    assert.strictEqual(String(accountIds[0]).length, MONGO_ID_LENGTH);
    assert.strictEqual(String(accountIds[1]).length, MONGO_ID_LENGTH);
  }).timeout(15000); // 15 secs

  it("countDocuments", async () => {
    const documentCount = await Account.countDocuments();
    assert.strictEqual(documentCount, 6);
  });
});

describe('createTransfers()', () => {
  it("generated transfer records should contain generated ids", async () => {
    transfers = await createTransfers(accounts, users);
    const transferIds = transfers.map(x => x._id);
    assert.strictEqual(transferIds.length, expectedAccountEntries); // 1 transfer each for n accounts
    assert.strictEqual(String(transferIds[0]).length, MONGO_ID_LENGTH);
    assert.strictEqual(String(transferIds[1]).length, MONGO_ID_LENGTH);
    await waitFor(2500); // Provide the create triggers time to generate the tx records
  }).timeout(15000); // 15 secs

  it("countDocuments", async () => {
    const documentCount = await Transfer.countDocuments();
    assert.strictEqual(documentCount, 6);
  });

  it("generates transaction records", async () => {
    // 2 transacation records (1 debit, 1 credit) should be created for each transfer
    const documentCount = await Transaction.countDocuments();
    assert.strictEqual(documentCount, expectedAccountEntries * 2);
  });
});