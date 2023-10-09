import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../db/prisma';
export const adminLogin = async (req: Request, res: Response) => {
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
};
export const adminRegister = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, userName, email, password, phone, typeId, userTypeId } = req.body;
		const isHasEmail = await prisma.admin.findUnique({
			where: {
				email: email,
			},
		});
		if (isHasEmail) {
			return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
		}
		const isHasUserName = await prisma.admin.findUnique({
			where: {
				userName: userName,
			},
		});
		if (isHasUserName) {
			return res.status(409).json({ error: 'Bunday userName mavjud!' });
		}
		const isHasPhone = await prisma.admin.findUnique({
			where: {
				phone: phone,
			},
		});
		if (isHasPhone) {
			return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
		}
		const isTeacherAdmin = await prisma.adminType.findUnique({
			where: {
				id: +typeId,
				name: 'teacher',
			},
		});
		if (isTeacherAdmin) {
			return res.status(409).json({ error: "Admin teacher tipida bo'la olmaydi" });
		}
		const isSuperAdmin = await prisma.adminType.findUnique({
			where: {
				id: +typeId,
				name: 'super',
			},
		});
		const isHasSuperAdmin = await prisma.adminType.findFirst({
			where: {
				OR: [
					{
						Admin: {
							some: {
								typeId: isSuperAdmin?.id,
							},
						},
					},
					{
						Teacher: {
							some: {
								typeId: isSuperAdmin?.id,
							},
						},
					},
				],
			},
		});
		if (isSuperAdmin && isHasSuperAdmin) {
			return res.status(409).json({ error: 'Super admin allaqachon mavjud!' });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const admin = await prisma.admin.create({
			data: {
				firstName,
				lastName,
				userName,
				email,
				password: hashPassword,
				phone,
				type: {
					connect: {
						id: typeId,
					},
				},
				userType: {
					connect: {
						id: userTypeId,
					},
				},
			},
			include: {
				type: true,
				userType: true,
			},
		});
		if (!admin) {
			return res.status(500).json({
				error: 'Serverda xatolik yuz berdi!',
			});
		}
		const token = jwt.sign({ adminId: admin.id }, 'secret', { expiresIn: '7d' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({
			user: { token, userType: admin.userType.name, fistName: admin.firstName, lastName: admin.lastName, adminType: admin.type.name },
			message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!",
		});
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
		const isHasSuperAdmin = await prisma.adminType.findFirst({
			where: {
				OR: [
					{
						Admin: {
							some: {
								typeId: isSuperAdmin?.id,
							},
						},
					},
					{
						Teacher: {
							some: {
								typeId: isSuperAdmin?.id,
							},
						},
					},
				],
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

		res.status(200).json({ message: "Admin muvaffaqiyatli qo'shildi!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getAdmin = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1] || '';
		const id = (jwt.verify(token, 'secret') as JwtPayload).adminId;
		if (!id) {
			return res.status(404).json({ error: 'Token xatosi!' });
		}
		const admin = await prisma.admin.findUnique({
			where: { id },
			include: {
				type: true,
				userType: true,
			},
		});
		if (!admin) {
			return res.status(404).json({ error: 'Admin topilmadi!' });
		}

		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({
			user: { token, userType: admin.userType.name, fistName: admin.firstName, lastName: admin.lastName, adminType: admin.type.name },
			message: 'Autentifikatsiya muvaqffaqiyatli amalga oshirildi!',
		});
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
export const getTotal = async (req: Request, res: Response) => {
	try {
		const lessons = await prisma.lesson.findMany({
			where: {
				day: new Date().getDate(),
				isAttandance: false,
			},
			include: {
				group: {
					include: {
						GroupTeacher: {
							include: {
								teacher: true,
							},
						},
						dayPart: true,
						room: true,
						type: {
							include: {
								sciense: true,
							},
						},
					},
				},
			},
		});
		res.status(200).json({ lessons });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
