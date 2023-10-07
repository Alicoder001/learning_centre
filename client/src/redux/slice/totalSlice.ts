import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
export interface totalInfoI {
	id: number;
	name: string;
	students: number;
	teachers: number;
	link: string;
	contolType: string;
}
const initialState = {
	totalId: null,
	isLoading: false,
	name: null,
	link: '',
	controlType: null,
	studentCount: 0,
	teacherCount: 0,
	teachers: [],
	groups: [],
	error: null,
	isSucces: false,
	controlTypes: null,
	message: null,
	totalFinished: false,
	lessons: [],
};
export const totalSlice = createSlice({
	name: 'total',
	initialState,
	reducers: {
		getTotalStart(state) {
			state.isLoading = true;
		},
		getTotalSucces(state, action) {
			const { name, link, controlType, studentCount, teacherCount, types, id, lessons, teachers, groups } = action.payload;
			console.log(controlType);
			state.isLoading = false;
			state.name = name || '';
			state.link = link || '';
			state.controlType = controlType || null;
			state.studentCount = studentCount || 0;
			state.teacherCount = teacherCount || 0;
			state.controlTypes = types || null;
			state.totalId = id;
			state.error = null;
			state.isSucces = true;
			state.totalFinished = true;
			state.lessons = lessons;
			state.teachers = teachers;
			state.groups = groups;
		},
		getTotalFailure(state, action) {
			state.isLoading = false;
			state.error = action.payload;
			state.isSucces = false;
			state.totalFinished = true;
		},
		updateTotalStart(state) {
			state.isLoading = true;
		},
		updateTotalSucces(state, action) {
			const { controlType, message } = action.payload;
			state.controlType = controlType || null;
			state.message = message || null;
			state.isLoading = false;
			state.error = null;
		},
		updateTotalFailure(state, action) {
			state.error = action.payload.message || 'Error!';
			state.isLoading = false;
		},
	},
});
export const { getTotalSucces, getTotalStart, getTotalFailure, updateTotalFailure, updateTotalStart, updateTotalSucces } = totalSlice.actions;
export default totalSlice.reducer;
