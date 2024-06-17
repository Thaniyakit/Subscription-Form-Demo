import {type Page, type Locator, expect} from '@playwright/test'
import messages from '../../utils/messages';

export class FormPage{

	readonly page: Page;
	readonly firstNameField: Locator;
	readonly lastNameField: Locator;
	readonly emailField: Locator;
	readonly country: Locator;
	readonly subscription: Locator;
	readonly claimFreeCheckbox: Locator;

	readonly notCorrectFirstName: Locator;
	readonly notCorrectLastName: Locator;
	readonly notCorrectEmail: Locator;

	readonly continueButton: Locator;
	readonly confirmButton: Locator;
	readonly modifyButton: Locator;
	readonly paymentButton: Locator;

	constructor (page) {
		this.page = page;
		this.firstNameField = page.getByPlaceholder('Please enter your first name.');
		this.lastNameField = page.getByPlaceholder('Please enter your last name.');
		this.emailField = page.getByPlaceholder('Please enter a valid email');
		this.country = page.getByLabel('Country:');
		this.subscription =  page.locator('label');
		this.claimFreeCheckbox = page.getByLabel('Claim a FREE 7-day Trial');
		
		this.notCorrectFirstName = page.getByText(messages.form.invalidName).first()
		this.notCorrectLastName = page.getByText(messages.form.invalidName).nth(1);
		this.notCorrectEmail = page.getByText(messages.form.invalidEmail)

		this.continueButton = page.getByRole('button', { name: 'Continue →' })
		this.confirmButton = page.getByRole('button', { name: 'Confirm →' })
		this.modifyButton = page.getByRole('button', { name: '← Modify' })
		this.paymentButton = page.getByRole('button', { name: 'Proceed to Payment' });
	}

	async fillFirstName (firstName: string){
		await this.firstNameField.fill(firstName);
	}

	async fillLastName (lastName: string) {
		await this.lastNameField.fill(lastName);
	}

	async fillEmail (email: string) {
		await this.emailField.fill(email);
	}

	async chooseCountry (country: string) {
		await this.country.selectOption(country);
	}

	async chooseSubscription (subscription: string) {
		await this.subscription.filter({ hasText: subscription}).click();
	}

	async checkClaimFree (check: boolean) {
		if (check)
			await this.claimFreeCheckbox.check();
		else
			await this.claimFreeCheckbox.uncheck();
	}

	async clickContinueButton () {
		await this.continueButton.click();
	}

	async clickConfirmButton () {
		await this.confirmButton.click();
	}

	async clickModifyButton () {
		await this.modifyButton.click();
	}

	async clickPaymentButton () {
		await this.paymentButton.click();
	}

	async checkInvalidFirstname () {
		await expect(this.notCorrectFirstName).toHaveText(messages.form.invalidName);
	}

	async checkInvalidLastName () {
		await expect(this.notCorrectLastName).toHaveText(messages.form.invalidName);
	}

	async checkInvalidEmail () {
		await expect(this.notCorrectEmail).toHaveText(messages.form.invalidEmail);
	}

	async fillAllField (firstName: string, lastName: string, email: string, country: string, subscription: string, claimFree: string) {
		if (firstName != '' && firstName)
			await this.fillFirstName(firstName);
		if (lastName != '' && lastName)
			await this.fillLastName(lastName);
		if (email != '' && email)
			await this.fillEmail(email);
		if (country != '' && country)
			await this.chooseCountry(country);
		if (subscription != '' && subscription)
			await this.chooseSubscription(subscription);
		if (claimFree != '' && claimFree)
			await this.checkClaimFree(true);
		await this.clickContinueButton();
		
	}

	async confirmAllSubscription () {
		await this.clickConfirmButton();
		await this.clickPaymentButton();
	}

	async checkAllInvalidMessage (){
		await this.checkInvalidFirstname();
		await this.checkInvalidLastName();
		await this.checkInvalidEmail();
	}

	


}

export default FormPage;