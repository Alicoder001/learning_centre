import React from 'react';
import { AdminDashboardStyled } from './AdminDashboard.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/intex';

const AdminDashboard = () => {
	let { studentCount, teacherCount, lessons } = useSelector((state: RootState) => state.total);
	return (
		<AdminDashboardStyled className='.dashboard'>
			<ul className='category'>
				<li className='category-item'>
					<h3>O'quvchilar</h3>
					<p>{studentCount}</p>
				</li>
				<li className='category-item'>
					<h3>O'qituvchilar</h3>
					<p>{teacherCount}</p>
				</li>
				<li className='category-item'>
					<h3>Guruhlar</h3>
					<p>550</p>
				</li>
				<li className='category-item'>
					<h3>Xodimlar</h3>
					<p>550</p>
				</li>
			</ul>
			<div className='lessons'>
				<h1 className='lessons-title'>Bugungi darslar jadvali</h1>
				<ul className='lessons-list'>
					{lessons?.map((item: any) => {
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
										{item.group.GroupTeacher[0].teacher.firstName} {item.group.GroupTeacher[0].teacher.lastName}
									</p>
								</div>
								<div className='lessons-item__right'>
									<h2 className='lessons-item__title'>{item.isNotDone ? 'Davomat olinmagan' : '2:34:45'}</h2>
									<p className='lessons-item__subt'>{item?.group?.dayPart?.part}</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
			<div className='transactions'>
				<h1 className='transactions-title'>Tranzaksiyalar</h1>
				<ul className='transactions-list'>
					<li className={`transactions-item`}>tranzaksiya</li>
					<li className={`transactions-item`}>tranzaksiya</li>
					<li className={`transactions-item`}>tranzaksiya</li>
				</ul>
			</div>
		</AdminDashboardStyled>
	);
};

export default AdminDashboard;
