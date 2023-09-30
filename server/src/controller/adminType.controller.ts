import { Request, Response } from 'express';
import prisma from '../db/prisma';
export const addAdminType = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const data = await prisma.adminType.create({
			data: {
				name,
			},
		});
		if (!data) {
			return res.status(500).json({ error: "Ma'lumotlar qo'shilmadi!" });
		}
		res.status(200).json({ message: "Admin type qo'shildi!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
	}
};
export const getAdminTypes = async (req: Request, res: Response) => {
	try {
	} catch (error) {}
};
export const removeAdminType = async (req: Request, res: Response) => {
	try {
	} catch (error) {}
};
