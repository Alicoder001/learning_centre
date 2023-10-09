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
	defaultLink: 'http://localhost:3000/api/',
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
	teacherName: [],
	dayPart: [],
	weekPart: [],
	groupType: [],
	rooms: null,
	teacherTypes: [],
	userTypes: [],
	isDark: true,
};
export const totalSlice = createSlice({
	name: 'total',
	initialState,
	reducers: {
		getTotalStart(state) {
			state.isLoading = true;
		},
		getTotalSucces(state, action) {
			state.isLoading = false;
			state.name = action?.payload?.name || '';
			state.link = action?.payload?.link || '';
			state.controlType = action?.payload?.controlType || null;
			state.studentCount = action?.payload?.studentCount || 0;
			state.teacherCount = action?.payload?.teacherCount || 0;
			state.controlTypes = action?.payload?.types || null;
			state.totalId = action?.payload?.id;
			state.error = null;
			state.isSucces = true;
			state.totalFinished = true;
			state.lessons = action?.payload?.lessons;
			state.teachers = action?.payload?.teachers;
			state.groups = action?.payload?.groups;
			state.teacherName = action?.payload?.teacherName;
			state.dayPart = action?.payload?.dayPart;
			state.weekPart = action?.payload?.weekPart;
			state.groupType = action?.payload?.groupType;
			state.rooms = action?.payload?.rooms;
			state.teacherTypes = action?.payload?.teacherTypes;
			state.userTypes = action?.payload?.userTypes;
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
		setMode(state, action) {
			state.isDark = !action.payload;
		},
	},
});
export const { getTotalSucces, getTotalStart, getTotalFailure, updateTotalFailure, updateTotalStart, updateTotalSucces, setMode } =
	totalSlice.actions;
export default totalSlice.reducer;
