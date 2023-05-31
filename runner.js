const webdriver = require('selenium-webdriver');
const { By } = webdriver;
const url = 'https://magento.softwaretestingboard.com/';
const search_script = require('./search');
const registration_script = require('./registration');
const runner = async () => {
	const driver = new webdriver.Builder().forBrowser('chrome').build();
	await driver.get(url);
	await registration_script(driver);
	await driver.get(url);
	await search_script(driver);
};
runner();
