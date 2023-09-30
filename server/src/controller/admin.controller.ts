import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';
export const adminLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const admin = await prisma.admin.findUnique({
			where: {
				email,
			},
		});
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
		res.status(200).json({ message: 'Admin muvaffaqiyatli tizimga kirdi!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const adminRegister = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const isHasEmail = await prisma.admin.findUnique({
			where: {
				email: data.email,
			},
		});
		if (isHasEmail) {
			return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
		}
		const isHasUserName = await prisma.admin.findUnique({
			where: {
				userName: data.userName,
			},
		});
		if (isHasUserName) {
			return res.status(409).json({ error: 'Bunday userName mavjud!' });
		}
		const isHasPhone = await prisma.admin.findUnique({
			where: {
				phone: data.phone,
			},
		});
		if (isHasPhone) {
			return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
		}
		const isTeacherAdmin = await prisma.adminType.findUnique({
			where: {
				id: +data.typeId,
				name: 'teacher',
			},
		});
		if (isTeacherAdmin) {
			return res.status(409).json({ error: "Admin teacher tipida bo'la olmaydi" });
		}
		const isSuperAdmin = await prisma.adminType.findUnique({
			where: {
				id: +data.typeId,
				name: 'super',
			},
		});
		const isHasSuperAdmin = await prisma.admin.findFirst({
			where: {
				type: {
					name: 'super',
				},
			},
		});
		if (isSuperAdmin && isHasSuperAdmin) {
			return res.status(409).json({ error: 'Super admin allaqachon mavjud!' });
		}
		const hashPassword = await bcrypt.hash(data.password, 10);
		const admin = await prisma.admin.create({
			data: { ...data, password: hashPassword },
		});
		if (!admin) {
			return res.status(500).json({
				error: 'Serverda xatolik yuz berdi!',
			});
		}
		const token = jwt.sign({ adminId: admin.id }, 'secret', { expiresIn: '7d' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({ message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const addAdmin = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const isHasEmail = await prisma.admin.findUnique({
			where: {
				email: data.email,
			},
		});
		if (isHasEmail) {
			return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
		}
		const isHasUserName = await prisma.admin.findUnique({
			where: {
				userName: data.userName,
			},
		});
		if (isHasUserName) {
			return res.status(409).json({ error: 'Bunday userName mavjud!' });
		}
		const isHasPhone = await prisma.admin.findUnique({
			where: {
				phone: data.phone,
			},
		});
		if (isHasPhone) {
			return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
		}
		const isTeacherAdmin = await prisma.adminType.findUnique({
			where: {
				id: +data.typeId,
				name: 'teacher',
			},
		});
		if (isTeacherAdmin) {
			return res.status(409).json({ error: "Admin teacher tipida bo'la olmaydi!" });
		}
		const isSuperAdmin = await prisma.adminType.findUnique({
			where: {
				id: +data.typeId,
				name: 'super',
			},
		});
		const isHasSuperAdmin = await prisma.admin.findFirst({
			where: {
				type: {
					name: 'super',
				},
			},
		});
		if (isSuperAdmin && isHasSuperAdmin) {
			return res.status(409).json({ error: 'Super admin allaqachon mavjud!' });
		}
		const hashPassword = await bcrypt.hash(data.password, 10);
		const admin = await prisma.admin.create({
			data: { ...data, password: hashPassword },
		});
		if (!admin) {
			return res.status(500).json({
				error: 'Serverda xatolik yuz berdi!',
			});
		}
		const token = jwt.sign({ adminId: admin.id }, 'secret', { expiresIn: '7d' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({ message: "Admin muvaffaqiyatli qo'shildi!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getAdmin = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;
		const admin = await prisma.admin.findUnique({
			where: { id },
		});
		if (!admin) {
			return res.status(404).json({ error: 'Admin topilmadi!' });
		}
		res.status(200).json({ admin });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getAdmins = async (req: Request, res: Response) => {
	try {
		const admins = await prisma.admin.findMany({
			where: {
				type: {
					name: {
						not: 'super',
					},
				},
			},
		});
		if (!admins || admins?.length === 0) {
			return res.status(404).json({ error: "Adminlar yo'q!" });
		}
		res.status(200).json({ admins });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
