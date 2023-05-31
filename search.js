const webdriver = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const { By, Key } = webdriver;
const search_script = async (driver) => {
	const searchKey = 'bag';
	const searchInput = await driver.findElement(By.id('search'));
	await searchInput.sendKeys(searchKey);
	await searchInput.sendKeys(Key.ENTER);
	const screenshot = await driver.takeScreenshot();
	fs.writeFileSync(
		path.join('screenshots', `${searchKey}.png`),
		screenshot,
		'base64'
	);
	await setTimeout(async () => await driver.quit(), 10000);
};
module.exports = search_script;
