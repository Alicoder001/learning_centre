import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { createLesson } from '../utils';
export const addGroup = async (req: Request, res: Response) => {
	try {
		const { name, isActive, beginnedTime, dayPartId, weekPartId, teacherId, typeId, closeTime, roomId } = req.body;
		const hasGroup = await prisma.group.findFirst({
			where: {
				weekPart: {
					id: weekPartId,
				},
				dayPart: {
					id: dayPartId,
				},
				room: {
					id: roomId,
				},
			},
		});
		if (hasGroup) {
			return res.status(400).json({ error: 'Xona bu vaqtlarda band!' });
		}

		const group = await prisma.group.create({
			data: {
				name,
				beginnedTime: beginnedTime || null,
				closeTime: closeTime || null,
				isActive,
				dayPart: {
					connect: {
						id: dayPartId,
					},
				},
				weekPart: {
					connect: {
						id: weekPartId,
					},
				},
				type: {
					connect: {
						id: typeId,
					},
				},
				room: {
					connect: {
						id: roomId,
					},
				},
			},
		});
		if (teacherId) {
			const hasTeacherId = await prisma.teacher.findUnique({
				where: {
					id: teacherId,
				},
			});
			console.log(teacherId);
			if (!hasTeacherId) {
				createLesson();
				return res.status(200).json({
					group,
					message: 'Guruh yaratildi',
					warning: "O'qituvchi guruhga biriktirilmadi!",
				});
			}

			await prisma.groupTeacher.create({
				data: {
					teacherId,
					groupId: group.id,
				},
			});
		}
		if (!group) {
			return res.status(500).json({ error: 'Group yaratilmadi!' });
		}
		createLesson();
		res.status(200).json({ message: 'Group yaratildi!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getGroup = async (req: Request, res: Response) => {
	try {
	} catch (error) {}
};
export const getGroups = async (req: Request, res: Response) => {
	try {
		const groups = await prisma.group.findMany({
			include: {
				GroupTeacher: {
					include: {
						teacher: true,
					},
				},
				room: true,
				weekPart: true,
				type: {
					include: {
						sciense: true,
					},
				},
				dayPart: true,
				Student: true,
			},
		});
		res.status(200).json(groups);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
