import express from 'express';
import prisma from '../db/prisma';
const totalInfoRouter = express.Router();
totalInfoRouter.get('/all', async (req, res) => {
	try {
		const token = req.cookies?.token;
		console.log(token);
		const response = await prisma.totalInfo.findMany({
			include: {
				controlType: true,
			},
		});
		const types = await prisma.centerType.findMany({
			select: {
				id: true,
				name: true,
				title: true,
				description: true,
				info: true,
				link: false,
			},
		});
		const total = response[0];
		const { controlType, ...rest } = total;
		const studentCount = await prisma.student.count({});
		const teacherCount = await prisma.teacher.count({});
		const groups = await prisma.group.findMany({});
		const teachers = await prisma.group.findMany({});
		const groupType = await prisma.groupType.findMany({});
		const dayPart = await prisma.dayPart.findMany({});
		const teacherName = await prisma.teacher.findMany({});
		const weekPart = await prisma.weekPart.findMany({});
		const rooms = await prisma.room.findMany({});
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
		res.status(200).json({
			...rest,
			link: controlType?.link ? controlType.link : '',
			controlType: controlType?.name ? controlType.name : null,
			studentCount,
			teacherCount,
			lessons,
			rooms,
			teachers,
			token,
			groups,
			types,
			dayPart,
			teacherName,
			weekPart,
			groupType,
		});
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
});
totalInfoRouter.patch('/update/id/:infoId/', async (req, res) => {
	try {
		const infoId = +req.params.infoId;
		const { typeId } = req.body;
		const type = await prisma.centerType.findUnique({
			where: {
				id: typeId,
			},
		});
		if (!type) {
			return res.status(404).json({ error: 'Bunday type mavjud emas' });
		}
		const info = await prisma.totalInfo.findUnique({
			where: {
				id: infoId,
			},
		});
		if (!info) {
			return res.status(404).json({ error: 'Bunday infoId mavjud emas!' });
		}
		const updateInfo = await prisma.totalInfo.update({
			where: {
				id: infoId,
			},
			data: {
				typeId,
			},
			include: {
				controlType: true,
			},
		});
		res.status(200).json({ controlType: updateInfo?.controlType?.name ? updateInfo.controlType.name : null, message: "Ma'lumot yangilandi!" });
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
});
export default totalInfoRouter;
// totalInfoRouter.post('get', async (req, res) => {
// 	try {
// 		const { name } = req.body;

// 		const response = await prisma.totalInfo.create({
// 			data: {
// 				name,
// 			},
// 		});
// 		res.status(200).json({ data: response });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
// 	}
// });
