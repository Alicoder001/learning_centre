import express from 'express';
import prisma from '../db/prisma';
import { currentTime } from '../utils';

const lessonRouter = express.Router();
lessonRouter.post('/add', async (req, res) => {
	try {
		const { name, subject, roomId, groupId } = req.body;
		const response = await prisma.lesson.create({
			data: {
				name,
				subject,
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
lessonRouter.get('/today', async (req, res) => {
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
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
});
export default lessonRouter;
