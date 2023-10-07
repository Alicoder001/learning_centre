import { format } from 'date-fns';
import schedule from 'node-schedule';
import app from './app';
import dotenv from 'dotenv';
import prisma from './db/prisma';
import { createLesson, everyHour } from './utils';
dotenv.config;
async function runServer() {
	app.listen(3000, () => {
		console.log('server started....!!!');
	});
}
runServer();

createLesson();
everyHour;
