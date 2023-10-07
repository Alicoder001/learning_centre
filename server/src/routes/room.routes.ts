import express from 'express';
import prisma from '../db/prisma';

const roomRouter = express.Router();
roomRouter.post('/add', async (req, res) => {
	try {
		const { name, capacity } = req.body;
		const response = await prisma.room.create({
			data: {
				name,
				capacity,
			},
		});
		if (!response) {
			res.status(404).json({ error: "Room qo'shilmadi!" });
		}
		res.status(200).json({ message: "Room qo'shildi" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!!' });
	}
});
export default roomRouter;
