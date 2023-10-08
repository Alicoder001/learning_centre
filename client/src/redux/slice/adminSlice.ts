import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
const initialState = {
	total: {},
	isLoading: false,
	isFinished: false,
	profile: {},
	transactions: {},
	groups: [],
	teachers: [],
	students: [],
	groupDetail: {},
	studentDetail: {},
	teacherDetail: {},
	error: null,
	message: null,
	groupCreated: true,
};
const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		adminStart(state) {
			state.isLoading = true;
		},
		adminSucces(state, action) {
			state.isLoading = false;
			state.isFinished = true;
		},
		adminFailure(state, action) {
            
			(state.isLoading = false), (state.error = action?.payload || null);
			state.message = null;
			state.groupCreated = false;
		},
		groupsSucces(state, action) {
			state.isLoading = false;
			state.groups = action.payload;
			state.isFinished = true;
		},
		groupDetailSucces(state, action) {
			state.isLoading = false;
			state.groupDetail = action.payload;
			state.isFinished = true;
		},
		teachereSucces(state, action) {
			state.isLoading = false;
			state.teachers = action.payload;
			state.isFinished = true;
		},
		studentsSucces(state, action) {
			state.isLoading = false;
			state.students = action.payload;
			state.isFinished = true;
		},
		groupCreateSlice(state, action) {
			const { error, message } = action.payload;
			state.isLoading = false;
			state.message = message || null;
			state.isFinished = true;
			state.error = error || null;
			state.groupCreated = true;
		},
	},
});
export const { adminSucces, adminStart, adminFailure, groupsSucces, groupDetailSucces, teachereSucces, studentsSucces, groupCreateSlice } =
	adminSlice.actions;
export default adminSlice.reducer;
