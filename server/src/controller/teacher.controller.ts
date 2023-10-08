import { Request, Response } from 'express';
import prisma from '../db/prisma';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
export const teacherLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const teacher = await prisma.teacher.findUnique({
			where: {
				email,
			},
			include: {
				userType: true,
				adminType: true,
				type: true,
			},
		});
		if (!teacher) {
			return res.status(404).json({ error: 'Email xato!' });
		}
		const isValidPassword = await bcrypt.compare(password, teacher.password);
		console.log(isValidPassword);
		if (!isValidPassword) {
			return res.status(401).json({ error: 'Parol xato' });
		}
		const token = jwt.sign({ teacherId: teacher.id }, 'secret', { expiresIn: '7d' });
		res.status(200).json({
			user: {
				token,
				userType: teacher.userType.name,
				fistName: teacher.firstName,
				lastName: teacher.lastName,
				adminType: teacher.adminType?.name,
				teacherType: teacher.type.name,
			},

			message: 'Admin muvaffaqiyatli tizimga kirdi!',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const teacherRegister = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, userName, email, password, phone, typeId, adminTypeId, groupId, userTypeId } = req.body;
		const isHasEmail = await prisma.teacher.findUnique({
			where: {
				email,
			},
		});
		if (isHasEmail) {
			return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
		}
		const isHasUserName = await prisma.teacher.findUnique({
			where: {
				userName,
			},
		});
		if (isHasUserName) {
			return res.status(409).json({ error: 'Bunday userName mavjud!' });
		}
		const isHasPhone = await prisma.teacher.findUnique({
			where: {
				phone,
			},
		});
		if (isHasPhone) {
			return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
		}

		const isSuperAdmin = await prisma.adminType.findUnique({
			where: {
				id: +adminTypeId,
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
		const teacher = await prisma.teacher.create({
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
				adminType: {
					connect: {
						id: adminTypeId,
					},
				},
			},
			include: {
				type: true,
				userType: true,
				adminType: true,
			},
		});
		if (!teacher) {
			return res.status(500).json({
				error: 'Serverda xatolik yuz berdi!',
			});
		}
		if (groupId) {
			const hasGroupId = await prisma.group.findUnique({
				where: {
					id: groupId,
				},
			});
			if (!hasGroupId) {
				const token = jwt.sign({ teacherId: teacher.id }, 'secret', { expiresIn: '7d' });

				return res.status(200).json({
					user: {
						token,
						userType: teacher.userType.name,
						fistName: teacher.firstName,
						lastName: teacher.lastName,
						adminType: teacher.adminType?.name,
						teacherType: teacher.type.name,
					},
					message: "O'qituvchi muvaffaqiyatli ro'yxatdan o'tdi!",
					error: "O'qituvchi guruhga biriktirilmadi!",
				});
			}

			await prisma.groupTeacher.create({
				data: {
					teacherId: teacher.id,
					groupId: groupId || null,
				},
			});
		}

		const token = jwt.sign({ teacherId: teacher.id }, 'secret', { expiresIn: '7d' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({
			user: {
				token,
				userType: teacher.userType.name,
				fistName: teacher.firstName,
				lastName: teacher.lastName,
				adminType: teacher.adminType?.name,
				teacherType: teacher.type.name,
			},
			message: "O'qituvchi muvaffaqiyatli ro'yxatdan o'tdi!",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const addTeacher = async (req: Request, res: Response) => {
	const { firstName, lastName, userName, email, password, phone, typeId, adminTypeId, groupId, userTypeId } = req.body;

	try {
		const isHasEmail = await prisma.teacher.findUnique({
			where: {
				email,
			},
		});

		if (isHasEmail) {
			return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
		}

		const isHasUserName = await prisma.teacher.findUnique({
			where: {
				userName,
			},
		});

		if (isHasUserName) {
			return res.status(409).json({ error: 'Bunday userName mavjud!' });
		}

		const isHasPhone = await prisma.teacher.findUnique({
			where: {
				phone,
			},
		});

		if (isHasPhone) {
			return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
		}

		const isSuperAdmin = await prisma.adminType.findUnique({
			where: {
				id: +adminTypeId,
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

		console.log(isHasSuperAdmin);
		console.log(isSuperAdmin);

		if (isSuperAdmin && isHasSuperAdmin) {
			return res.status(409).json({ error: 'Super admin allaqachon mavjud!' });
		}

		const hashPassword = await bcrypt.hash(password, 10);

		// Create the teacher
		const teacher = await prisma.teacher.create({
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
				adminType: {
					connect: {
						id: adminTypeId,
					},
				},
			},
		});

		if (!teacher) {
			return res.status(500).json({
				error: 'Serverda xatolik yuz berdi!',
			});
		}
		if (groupId) {
			const hasGroupId = await prisma.group.findUnique({
				where: {
					id: groupId,
				},
			});
			if (!hasGroupId) {
				return res.status(200).json({
					message: "O'qituvchi muvaffaqiyatli bazaga qo'shildi!",
					error: "O'qituvchi guruhga biriktirilmadi!",
				});
			}

			await prisma.groupTeacher.create({
				data: {
					teacherId: teacher.id,
					groupId: groupId || null,
				},
			});
		}
		res.status(200).json({ message: "O'qituvchi muvaffaqiyatli bazaga qo'shildi!" });
	} catch (error) {
		console.log(error);

		res.status(500).json({ error: "Serverda xatolik yuz berdi, Teacher groupga biriktirilmagan bo'lishi mumkin!" });
	}
};

export const getTeacher = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1] || '';
		const id = (jwt.verify(token, 'secret') as JwtPayload).teacherId;
		if (id) {
			return res.status(404).json({ error: 'Token xatosi!' });
		}
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
export const getTeachers = async (req: Request, res: Response) => {
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
