// import express from 'express';

// import prisma from '../db/prisma';
// const teacherTypeRouter = express.Router();
// teacherTypeRouter.post('/add', async (req, res) => {
// 	try {
// 		const { type } = req.body;
// 		const data = await prisma.teacherType.create({
// 			data: {
// 				name,
// 			},
// 		});
// 		if (!data) {
// 			return res.status(500).json({ error: "Ma'lumotlar qo'shilmadi!" });
// 		}
// 		res.status(200).json({ message: "Teacher type qo'shildi!" });
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
// 	}
// });
// export default teacherTypeRouter;
