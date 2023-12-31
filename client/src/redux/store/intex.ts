import { configureStore } from '@reduxjs/toolkit';
import totalSlice from '../slice/totalSlice';
import userSlice from '../slice/userSlice';
import adminSlice from '../slice/adminSlice';
import teacherSlice from '../slice/teacherSlice';

export const store = configureStore({
	reducer: {
		total: totalSlice,
		user: userSlice,
		admin: adminSlice,
		teacher:teacherSlice
	},
	devTools: process.env.NODE_ENV !== 'production',
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
