import { Request, Response } from 'express';
import prisma from '../db/prisma';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
export const studentLogin = async (req: Request, res: Response) => {
	try {
	} catch (error) {}
};
export const studentRegister = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, userName, email, password, phone, studentId, groupId, userTypeId } = req.body;
		const isHasEmail = await prisma.student.findUnique({
			where: {
				email,
			},
		});
		if (isHasEmail) {
			return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
		}
		const isHasUserName = await prisma.student.findUnique({
			where: {
				userName,
			},
		});
		if (isHasUserName) {
			return res.status(409).json({ error: 'Bunday userName mavjud!' });
		}
		const isHasPhone = await prisma.student.findUnique({
			where: {
				phone,
			},
		});
		if (isHasPhone) {
			return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const student = await prisma.student.create({
			data: {
				firstName,
				lastName,
				userName,
				email: email || null,
				password: hashPassword,
				phone,
				studentId,
				group: {
					connect: {
						id: groupId,
					},
				},
				userType: {
					connect: {
						id: userTypeId,
					},
				},
			},
			include: {
				userType: true,
				group: true,
			},
		});
		const token = jwt.sign({ studentId: student.id }, 'secret', { expiresIn: '7d' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({
			user: {
				token,
				fistName: student.firstName,
				lastName: student.lastName,
				userType: student.userType.name,
				groupName: student.group?.name,
				adminType: null,
			},
			message: "Student muvaffaqiyatli ro'yxatdan o'tdi!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const addStudent = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, userName, email, password, phone, studentId, groupId, userTypeId } = req.body;
		const isHasEmail = await prisma.student.findUnique({
			where: {
				email,
			},
		});
		if (isHasEmail) {
			return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
		}
		const isHasUserName = await prisma.student.findUnique({
			where: {
				userName,
			},
		});
		if (isHasUserName) {
			return res.status(409).json({ error: 'Bunday userName mavjud!' });
		}   
		const isHasPhone = await prisma.student.findUnique({
			where: {
				phone,
			},
		});
		if (isHasPhone) {
			return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		await prisma.student.create({
			data: {
				firstName,
				lastName,
				userName,
				email: email,
				password: hashPassword,
				phone,
				studentId,
				group: {
					connect: {
						id: groupId,
					},
				},
				userType: {
					connect: {
						id: userTypeId,
					},
				},
			},
		});
		res.status(200).json({ message: "Student bazaga qo'shildi!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getStudent = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1] || '';
		const id = (jwt.verify(token, 'secret') as JwtPayload).studentId;
		if (id) {
			return res.status(404).json({ error: 'Token xatosi!' });
		}
		const student = await prisma.student.findUnique({
			where: { id },
		});
		if (!student) {
			return res.status(404).json({ error: 'Student topilmadi!' });
		}
		res.status(200).json({ student });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getStudents = async (req: Request, res: Response) => {
	try {
	} catch (error) {}
};
export const getStudentByGroup = async (req: Request, res: Response) => {
	try {
	} catch (error) {}
};
