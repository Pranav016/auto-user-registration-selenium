const webdriver = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const { By } = webdriver;
const registration_script = async (driver) => {
	let user = {
		firstname: 'Test',
		lastname: 'User',
		email: 'email',
		password: 'P@123456',
		confirmPassword: 'P@123456',
	};
	user.email = generateRandomEmail();
	await driver
		.findElement(By.xpath('/html/body/div[1]/header/div[1]/div/ul/li[3]/a'))
		.click();
	await fillUserDetails(driver, user);
	await driver
		.findElement(By.xpath('//*[@id="form-validate"]/div/div[1]/button'))
		.click();

	const userDetails = await printUserRegistrationMsg(driver);
	if (userDetails) {
		const screenshot = await driver.takeScreenshot();
		fs.writeFileSync(
			path.join('screenshots', `${userDetails[1]}.png`),
			screenshot,
			'base64'
		);
	}
};
const fillUserDetails = async (driver, user) => {
	let { firstname, lastname, email, password, confirmPassword } = user;
	await driver.findElement(By.id('firstname')).sendKeys(firstname);
	await driver.findElement(By.id('lastname')).sendKeys(lastname);
	await driver.findElement(By.id('email_address')).sendKeys(email);
	await driver.findElement(By.id('password')).sendKeys(password);
	await driver
		.findElement(By.id('password-confirmation'))
		.sendKeys(confirmPassword);
};
const printUserRegistrationMsg = async (driver) => {
	const pageTitle = await driver.getTitle();
	let userDetails;
	try {
		const userDetailsElement = await driver.findElement(
			By.xpath(
				'//*[@id="maincontent"]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/p'
			)
		);
		userDetails = await userDetailsElement.getText();
		userDetails = userDetails.split('\n');
	} catch (err) {}
	if (pageTitle === 'My Account' && userDetails) {
		console.log(`Registration successful!!!`);
		console.log(`Name: ${userDetails[0]}`);
		console.log(`Email: ${userDetails[1]}`);
		return userDetails;
	} else {
		console.log('Registration unsuccessful!!!');
		return null;
	}
};
const generateRandomEmail = () => {
	const emailDomain = 'example.com';
	const randomString = Math.random().toString(36).substring(2, 8);
	return `user_${randomString}@${emailDomain}`;
};
module.exports = registration_script;
