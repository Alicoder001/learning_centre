import express from 'express';
import prisma from '../db/prisma';
import { supAdminAuth } from '../middleware';

const dayPartRouter = express.Router();
dayPartRouter.post('/add', supAdminAuth, async (req, res) => {
	try {
		const { part, durationTime } = req.body;
		const response = await prisma.dayPart.create({
			data: {
				part,
				durationTime,
			},
		});
		if (!response) {
			res.status(404).json({ error: "Day part qo'shilmadi!" });
		}
		res.status(200).json({ message: "Day part qo'shildi" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!!' });
	}
});
export default dayPartRouter;
