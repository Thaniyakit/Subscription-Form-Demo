import {expect, type Page, type Locator} from '@playwright/test'

export class PractiseFormPage{

	readonly page: Page;
	readonly firstNameField: Locator;
	readonly lastNameField: Locator;
	
	gender: Locator;
	yearOfExp: Locator;

	readonly dateField: Locator;

	profession: Locator;
	automationTool: Locator;

	readonly continents: Locator;
	readonly seleniumCommand: Locator;

	readonly button: Locator;

	constructor (page) {
		this.page = page;
		this.firstNameField = page.locator('input[name="firstname"]');
		this.lastNameField = page.locator('input[name="lastname"]');
		
		this.dateField = page.locator('#datepicker')
		
		this.continents = page.locator('#continents')
		this.seleniumCommand = page.locator('#selenium_commands')

		this.button = page.getByRole('button', { name: 'Button' })
	}

	locatorGender (number: string) {
		this.gender = this.page.locator('#sex-'+number);
	}

	locatorYearOfExp (number: string) {
		this.yearOfExp = this.page.locator('#exp-'+number);
	}

	locatorProfession (number: string) {
		this.profession = this.page.locator('#profession-'+number);
	}

	locatorAutomationTool (number: string) {
		this.automationTool = this.page.locator('#tool-'+number)
	}

	async fillFirstName (firstName: string) {
		await this.firstNameField.fill(firstName);
	}

	async fillLastName (lastName: string) {
		await this.lastNameField.fill(lastName);
	}

	async chooseGender (gender: string) {
		if (gender == 'Male')
			this.locatorGender('0');
		else if (gender == 'Female')
			this.locatorGender('1');
		await this.gender.click();
	}

	async chooseYearOfExp (year: string) {
		let yearNum = parseInt(year)
		yearNum -= 1;
		year = yearNum.toString();
		this.locatorYearOfExp(year);
		await this.yearOfExp.click();
	}

	async fillDate (date: string) {
		await this.dateField.fill(date);
	}

	async checkProfession (tester: string[]) {
		for (let i=0; i<2; i++) {
			this.locatorProfession(i.toString());
			if (tester[i] == 'TRUE'){
				await this.profession.check();
			}
			else{
				await this.profession.uncheck();
			}
		}
	}

	async checkAutomationTool (tool: string[]) {
		for (let i=0; i<3; i++) {
			this.locatorAutomationTool(i.toString());
			if (tool[i] == 'TRUE'){
				await this.automationTool.check();
			}
			else{
				await this.automationTool.uncheck();
			}
		}
	}

	async chooseContinent (continent: string) {
		await this.continents.selectOption(continent);
	}

	async chooseSeleniumCommand (seleniumCommand: string) {
		await this.seleniumCommand.selectOption(seleniumCommand);
	}

	async clickButton () {
		await this.button.click();
	}

	async fillAllFields (firstName: string, lastName: string, gender: string, yearOfExp: string, date: string, profession: string[], automationTool: string[], continent: string, seleniumCommand: string) {
		await this.fillFirstName(firstName);
		await this.fillLastName(lastName);
		await this.chooseGender(gender);
		await this.chooseYearOfExp(yearOfExp);
		await this.fillDate(date);
		await this.checkProfession(profession);
		await this.checkAutomationTool(automationTool);
		await this.chooseContinent(continent);
		await this.chooseSeleniumCommand(seleniumCommand);
		await this.clickButton();
	}

}

export default PractiseFormPage;