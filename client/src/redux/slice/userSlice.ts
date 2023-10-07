import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialState = {
	isLoading: false,
	isLoggedIn: false,
	userInfo: null,
	error: null,
	message: null,
	userType: null,
	userFinished:false,
};
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userSignStart(state) {
			state.isLoading = true;
		},
		userSignSucces(state, action) {
			const { response, link } = action.payload;
			console.log(action.payload);
			state.isLoading = false;
			state.isLoggedIn = true;
			state.message = response.message || null;
			state.userInfo = response.user || null;
			state.userType = response.user?.userType || null;
			state.error = null;
			state.isLoggedIn = true;
			console.log(response);
			const userData = { token: response.user?.token, userType: response.user.userType };
			localStorage.setItem('userInfo', JSON.stringify(userData));
			state.userFinished = true;
		},
		userSignFailure(state, action) {
			state.isLoading = false;
			state.error = action.payload;
			console.log(action.payload);
			state.userFinished = true;
		},
		userLogOut(state) {
			state.isLoggedIn = false;
			state.userInfo = null;
			state.userType = null;
			state.message = null;
			localStorage.removeItem('userInfo');
		},
	},
});
export const { userSignSucces, userSignStart, userSignFailure, userLogOut } = userSlice.actions;
export default userSlice.reducer;
