const faker = require('faker');

const generatePhoneNumber = (length = 8) => {
  return Array.from({ length }, () => Math.floor(Math.random() * length)).join('');
};

const defaultUserData = {
  password: 'passw0rd',
  dateOfBirth: faker.date.between('1960-01-01', '2000-12-31'),
  phone: generatePhoneNumber(),
  picture: faker.internet.avatar(),
  streetAddr: faker.address.streetAddress(),
  postcode: faker.address.zipCode(),
  city: 'Singapore',
};

const defaultAccountData = {
  type: 'basic',
  isActive: true,
};

const getDefaultTransferData = () => ({
  type: 'normal',
  date: faker.date.between('2020-01-01', '2020-10-14'),
  amount: faker.finance.amount(1, 10000, 2),
  status: 'done',
  reference: faker.lorem.words(3).substring(0, 20),
});

const dummyData = {
  exchangeRates: [{
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
  }],
  users: [{
    ...defaultUserData,
    email: 'admin@sentosabank.com',
    firstName: 'Edmund',
    lastName: 'Davids',
  }, {
    ...defaultUserData,
    email: 'dan.larimer@eos.io',
    firstName: 'Dan',
    lastName: 'Larimer',
  }],
  accounts: [{
    ...defaultAccountData,
    sortcode: '001122',
    number: '01230123',
    currency: 'GBP',
    balance: 100000,
  }, {
    ...defaultAccountData,
    sortcode: '004489',
    number: '98765432',
    currency: 'USD',
    balance: 200000,
  }, {
    ...defaultAccountData,
    sortcode: '005599',
    number: '44477723',
    currency: 'SGD',
    balance: 500000,
  }],
};

module.exports = {
  dummyData,
  getDefaultTransferData,
};