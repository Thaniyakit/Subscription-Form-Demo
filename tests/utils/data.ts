import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';
type personalData = {
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	subscription: string;
	claimFree: boolean;
}



const csvFilePath = path.resolve('subscription.csv')
const headers = ['firstName', 'lastName', 'email', 'country', 'subscription', 'claimFree'];

const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf-8'});

export const subscriptionData = parse(fileContent, {
	delimiter: ',',
	columns: headers,
	fromLine: 2,
}
);


const csvFilePath2 = path.resolve('practise.csv')
const headers2 = ['firstName', 'lastName', 'gender', 'yearOfExp', 'date', 'manualTester', 'automationTester', 'uft', 'protactor', 'seleniumWebdriver', 'continent', 'seleniumCommand']

const fileContent2 = fs.readFileSync(csvFilePath2, {encoding: 'utf-8'});


export const practiseFormData =parse(fileContent2, {
	delimiter: ',',
	columns: headers2,
	fromLine: 2,
}
);
// console.log(practiseFormData);



		

