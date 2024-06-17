import { test } from '@playwright/test'
import { practiseFormData } from '../../utils/data';
import PractiseFormPage from '../pages/practiceFormPage';


let practiseFormPage: PractiseFormPage;

test.beforeEach(async ({ page }) => {
	await page.goto('https://www.techlistic.com/p/selenium-practice-form.html');
})

test.describe('Automation Practise Form - form', () => {
	let i=0;
	for (const record of practiseFormData) {
		i++;
		test(`check successful fill form when all fields are input with csv file - (${i})`, async ({ page }) => {
			
			practiseFormPage = new PractiseFormPage(page);
			
			let firstName = record.firstName;
			let lastName = record.lastName
			let gender = record.gender
			let yearOfExp = record.yearOfExp
			let date = record.date
			let manualTester = record.manualTester;
			let automationTester = record.automationTester;
			let profession = [manualTester, automationTester]
			let uft = record.uft
			let protactor = record.protactor
			let seleniumWebdriver = record.seleniumWebdriver
			let automationTools = [uft, protactor, seleniumWebdriver]
			let continent = record.continent
			let seleniumCommand = record.seleniumCommand

			await practiseFormPage.fillAllFields(firstName, lastName, gender, yearOfExp, date, profession, automationTools, continent, seleniumCommand)

		})
	}
})