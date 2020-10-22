module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.test\\.js$',
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer"
};
