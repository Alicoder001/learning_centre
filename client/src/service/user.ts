import axios from 'axios';
import { AppDispatch } from '../redux/store/intex';
import { totalInfoI } from '../redux/slice/totalSlice';
import { userSignFailure, userSignStart, userSignSucces } from '../redux/slice/userSlice';

export const userLogin = async (dispatch: AppDispatch, data: any, link: string, userType: string) => {
	dispatch(userSignStart());
	console.log(data);
	try {
		const response = await axios.post(`http://localhost:3000/api/${link ? link + '/' : ''}${userType}/login`, data);
		dispatch(userSignSucces({ response: response.data }));
		console.log(response.data);
	} catch (error) {
		console.log(error);
		dispatch(userSignFailure(error));
	}
};
