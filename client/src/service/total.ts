import axios from './api'
import { getTotalFailure, getTotalStart, getTotalSucces, totalInfoI } from '../redux/slice/totalSlice';
import { AppDispatch, RootState } from '../redux/store/intex';

export async function getTotalInfo(dispatch: AppDispatch) {
	dispatch(getTotalStart());

	try {
		const response = await axios('info/all');
		dispatch(getTotalSucces(response?.data));
	} catch (error) {
		console.log(error);
		dispatch(getTotalFailure(error));
	}
}
