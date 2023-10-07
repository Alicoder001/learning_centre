import express from 'express';
import prisma from '../db/prisma';

const lessonRouter = express.Router();
lessonRouter.post('/add', async (req, res) => {
	try {
		const { name, subject, roomId, groupId } = req.body;
		const response = await prisma.lesson.create({
			data: {
				name,
				subject,
				roomId,
				groupId,
			},
		});
		if (!response) {
			res.status(404).json({ error: "Lesson qo'shilmadi!" });
		}
		res.status(200).json({ message: "Lesson qo'shildi" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!!' });
	}
});
export default lessonRouter;
