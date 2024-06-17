import {test, expect} from '@playwright/test'
import FormPage from '../pages/formPage';
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';
import { subscriptionData } from '../../utils/data';

let formPage: FormPage;



test.beforeEach(async ({ page }) => {
	await page.goto('https://formsmarts.com/form/mfe?mode=h5');
})

test.describe('Subsciption Form - Subscription page', () =>{
	let i = 0;
	for (const record of subscriptionData) {
		i++;
		test(`check successful subscription when all fields are input with csv file: row ${i}`, async ({ page }) => {
			formPage = new FormPage(page);

			let firstName = record.firstName;
			let lastName = record.lastName;
			let email = record.email;
			let country = record.country;
			let subscription = record.subscription;
			let checkFree = record.checkFree;
		
			console.log(record)
					
			await formPage.fillAllField(firstName, lastName, email, country, subscription, checkFree);
			await formPage.confirmAllSubscription();
			
		});
	}

	test('check error messages when not input required fields', async ({ page }) => {
		formPage = new FormPage(page);

		await formPage.clickContinueButton();
		await formPage.checkAllInvalidMessage();

	})

	test('check error messages when input required fields wrong format', async ({ page }) => {

		formPage = new FormPage(page);

		let firstName = '64fe4';
		let lastName =  '4e4f45';
		let email = 'kfewf';

		formPage.fillAllField(firstName, lastName,email,'','','');
		await formPage.checkAllInvalidMessage();


	})
})