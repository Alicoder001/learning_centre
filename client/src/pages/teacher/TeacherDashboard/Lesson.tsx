import React, { useState } from 'react';
import addHours from 'date-fns/addHours';
const Lesson = ({ item }: any) => {
	const [date, setDate] = useState('');
	function DatteF(item: any) {
		if (item?.group?.dayPart?.part) {
			const second = new Date((new Date() as any) - (new Date(item?.startedTime) as any))?.getSeconds();
			const minute = new Date((new Date() as any) - (new Date(item?.startedTime) as any))?.getMinutes();
			const hour = new Date(
				(new Date(
					`${new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()}T${item?.group?.dayPart?.part}`,
				) as any) - (new Date() as any),
			)?.getHours();
			return { second, minute, hour };
		}
	}
	console.log(`${new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()}T${item?.group?.dayPart?.part}:00.000T`);
	setInterval(() => {
		setDate(`${DatteF(item)?.hour + ':' + DatteF(item)?.minute + ':' + DatteF(item)?.second}` as string);
	}, 10000);
	return (
		<li key={item?.id} className={`lessons-item ${item.isNotDone && 'not-done'}`}>
			<div className='lessons-item__left'>
				<h2 className='lessons-item__title'>{item?.group?.name} guruh</h2>
				<p className='lessons-item__subt'>
					<span>Frontend</span> Standart
				</p>
			</div>
			<div className='lessons-item__center'>
				<h2 className='lessons-item__title'>{item?.group?.room?.name}</h2>
				<p className='lessons-item__subt'>
					{item.group.GroupTeacher[0]?.teacher?.firstName} {item.group.GroupTeacher[0]?.teacher?.lastName}
				</p>
			</div>
			<div className='lessons-item__right'>
				<h2 className='lessons-item__title'></h2>
				<p className='lessons-item__subt'>{item?.group?.dayPart?.part}</p>
			</div>
		</li>
	);
};

export default Lesson;
