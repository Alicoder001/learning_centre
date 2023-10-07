import express from 'express';
import prisma from '../db/prisma';
import { supAdminAuth } from '../middleware';

const scienceRouter = express.Router();
scienceRouter.post('/add', supAdminAuth, async (req, res) => {
	try {
		const { name } = req.body;
		const response = await prisma.sciense.create({
			data: {
				name,
			},
		});
		if (!response) {
			res.status(404).json({ error: "Yo'nalish qo'shilmadi!" });
		}
		res.status(200).json({ message: "Yo'nalish qo'shildi" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!!' });
	}
});
export default scienceRouter;
