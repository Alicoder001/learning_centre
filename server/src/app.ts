import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import VAdminRouter from './routes/admin_control/v_admin.routes';
import VTeacherRotuter from './routes/teacher_control/v_teacher.routes';
import VHybridRouter from './routes/hybrid_control/v_hybrid.routes';
import { adminRouter, studentRouter, totalInfoROuter } from './routes';
import cookieParser from 'cookie-parser';
import adminAuth from './middleware/adminAuth';
import prisma from './db/prisma';
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/v_admin', VAdminRouter);
app.use('/api/v_teacher', VTeacherRotuter);
app.use('/api/v_hybrid', VHybridRouter);
app.use('/api/student', studentRouter);
app.use('/api/info', totalInfoROuter);
app.post('/api/admin/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const admin = await prisma.admin.findUnique({
			where: {
				email,
			},
			include: {
				type: true,
				userType: true,
			},
		});
		if (admin?.type.name !== 'super') {
			return res.status(404).json({ error: 'Siz super admin emassiz!' });
		}
		if (!admin) {
			return res.status(404).json({ error: 'Email xato!' });
		}
		const isValidPassword = await bcrypt.compare(password, admin.password);
		console.log(isValidPassword);
		if (!isValidPassword) {
			return res.status(401).json({ error: 'Parol xato' });
		}
		const token = jwt.sign({ adminId: admin.id }, 'secret', { expiresIn: '7d' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({
			user: { token, userType: admin.userType.name, fistName: admin.firstName, lastName: admin.lastName, adminType: admin.type.name },
			message: 'Admin muvaffaqiyatli tizimga kirdi!',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
});
app.use('/api/admin', adminRouter);

// app.use('/api/centerType')
export default app;
