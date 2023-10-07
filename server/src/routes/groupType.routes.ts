import express from 'express';
import prisma from '../db/prisma';
import { supAdminAuth } from '../middleware';

const grouptTypeRouter = express.Router();
grouptTypeRouter.post('/add', supAdminAuth, async (req, res) => {
	try {
		const { name, price, totalDuration, scienseId } = req.body;
		const response = await prisma.groupType.create({
			data: {
				name,
				price,
				totalDuration,
				scienseId: +scienseId,
			},
		});
		if (!response) {
			res.status(404).json({ error: "Groupt type qo'shilmadi!" });
		}
		res.status(200).json({ message: "Groupt type qo'shildi" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
});
export default grouptTypeRouter;
