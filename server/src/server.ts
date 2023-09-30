import app from './app';
import dotenv from 'dotenv';
dotenv.config;
async function runServer() {
	app.listen(3000, () => {
		console.log('server started....!!!');
	});
}
runServer();
