import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	total: {},
	isLoading: false,
	isFinished: false,
	profile: {},
	groups: [],
	error: null,
	message: null,
	todayLessons: [],
	groupDetail: {},
	studentDetail: {},
};
const teacherSlice = createSlice({
	name: 'teacher',
	initialState,
	reducers: {
		teacherStart(state) {
			state.isLoading = true;
		},
		teacherSucces(state, action) {
			state.isLoading = false;
			state.isFinished = true;
			state.todayLessons = action?.payload?.lessons;
		},
		teacherFailure(state, action) {
			(state.isLoading = false), (state.error = action?.payload || null);
			state.message = null;
		},
		teacherGroupsSucces(state, action) {
			state.isLoading = false;
			state.groups = action.payload;
			state.isFinished = true;
		},
		teacherGroupDetailSucces(state, action) {
			state.isLoading = false;
			state.groupDetail = action.payload;
			state.isFinished = true;
		},
		teacherStudentDetailSucces(state, action) {
			state.isLoading = false;
			state.studentDetail = action.payload;
			state.isFinished = true;
		},
	},
});
export const { teacherSucces, teacherStart, teacherFailure, teacherGroupDetailSucces, teacherGroupsSucces, teacherStudentDetailSucces } =
	teacherSlice.actions;
export default teacherSlice.reducer;
