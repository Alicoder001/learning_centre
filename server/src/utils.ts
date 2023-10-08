import { addHours, format } from 'date-fns';
import prisma from './db/prisma';
import schedule from 'node-schedule';
export const currentTime = () => {
	const currentMin = new Date().getMinutes();
	const currentHour = new Date().getHours();
	const currentDay = new Date().getDate();
	const weekDay = new Date().getDay();
	const fullTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
	const ymd = format(new Date(), 'yyyy-MM-dd');
	return { currentMin, currentHour, currentDay, weekDay, fullTime, ymd };
};

const getCurrentGroup = async () => {
	const groups = await prisma.group.findMany({
		where: {
			isActive: true,
		},
		include: { weekPart: true, dayPart: true },
	});
	const filterGroup = groups.filter((item) => item.weekPart?.part.split('-').includes(currentTime().weekDay.toString()));
	return filterGroup;
};
const vaqtZonasi = Intl.DateTimeFormat().resolvedOptions().timeZone;

const timeZoneFormatter = (time: string) => {
	return addHours(new Date(time), 5);
};

export const createLesson = async () => {
	const groups = await getCurrentGroup();

	groups.forEach(async (item) => {
		try {
			const hasLesson = await prisma.lesson.findFirst({
				where: {
					day: currentTime().currentDay,
					groupId: item.id,
				},
			});

			if (!hasLesson) {
				await prisma.lesson.create({
					data: {
						name: '',
						group: {
							connect: {
								id: item.id,
							},
						},
						day: currentTime().currentDay,
						startedTime: timeZoneFormatter(`${currentTime().ymd} ${item.dayPart?.part}:00.000`),
					},
				});
			}
		} catch (error) {}
	});
};

const checkerTime = (time: Date) => {
	const vaqt = timeZoneFormatter(`2023-10-07 10:00:00.000`);
	const hozirgi = timeZoneFormatter(`${time}`);

	return { boolean: vaqt > hozirgi, ayirma: (vaqt - hozirgi) };
};
export const everyHour = schedule.scheduleJob('0 0 * * * *', async () => {
	createLesson();
});

const checkLesson = async () => {
	try {
		const lessons = await prisma.lesson.findMany({
			where: {
				day: new Date().getDate(),
				isAttandance: false,
			},
		});
		console.log(lessons);
		lessons.forEach(async (item) => {
			const dif = checkerTime(item.startedTime).boolean;

			if (!dif) {
				await prisma.lesson.update({
					where: {
						id: item.id,
					},
					data: {
						isNotDone: true,
					},
				});
			}
		});
	} catch (error) {}
};
export const everyMinutes = schedule.scheduleJob('* 1 * * * *', () => {
	checkLesson();
});
