import { Request, Response } from 'express';
import prisma from '../db/prisma';
export const addGroup = async (req: Request, res: Response) => {
	try {
		const { name, isActive, beginnedTime, dayPartId, weekPartId, teacherId, typeId, closeTime, scienseId, roomId } = req.body;
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
		if (!group) {
			return res.status(500).json({ error: 'Group yaratilmadi!' });
		}
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
