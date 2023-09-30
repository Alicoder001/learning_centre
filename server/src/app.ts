import express from 'express';
import cors from 'cors';
import VAdminRouter from './routes/admin_control/v_admin.routes';
import VTeacherRotuter from './routes/teacher_control/v_teacher.routes';
import VHybridRouter from './routes/hybrid_control/v_hybrid.routes';
import { studentRouter } from './routes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/v_admin', VAdminRouter);
app.use('/api/v_teacher', VTeacherRotuter);
app.use('/api/v_hybrid', VHybridRouter);
app.use('/api/student', studentRouter);
export default app;
