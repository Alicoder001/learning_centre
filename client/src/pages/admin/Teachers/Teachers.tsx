import React, { useEffect } from 'react';
import { TeachersStyled } from './Teachers.styled';
import { adminFailure, adminStart, groupsSucces, teachereSucces } from '../../../redux/slice/adminSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/intex';
import { useDispatch } from 'react-redux';
import axios from '../../../service/api';
import { Link } from 'react-router-dom';
const Teachers = () => {
	const { teachers } = useSelector((state: RootState) => state.admin);

	const { controlType, link, totalFinished } = useSelector((state: RootState) => state.total);
	const dispatch = useDispatch();
	const getTeachers = async () => {
		dispatch(adminStart());
		try {
			const response = await axios.get(`${controlType ? link : ''}teacher/all`);
			dispatch(teachereSucces(response.data));
		} catch (error) {
			dispatch(adminFailure(error));
		}
	};
	useEffect(() => {
		if (totalFinished) {
			getTeachers();
		}
	}, [totalFinished]);
	return (
		<TeachersStyled>
			<div className='teachers'>
				<h1 className='teachers-title'>Katta Ustozlar</h1>
				<ul className='teachers-list'>
					{teachers.map((item: any) => {
						console.log(item?.type.name);
						if (item?.type.name === 'Katta Ustoz') {
							return (
								<li key={item?.id} className={`teachers-item`}>
									<h2>
										{item?.firstName}
										{item?.lastName}
									</h2>
								</li>
							);
						}
					})}
				</ul>
			</div>
			<div className='teachers'>
				<h1 className='teachers-title'>Yordamchi Ustozlar</h1>
				<ul className='teachers-list'>
					{teachers.map((item: any) => {
						console.log(item?.type.name);
						if (item?.type.name !== 'Katta Ustoz') {
							return (
								<li key={item?.id} className={`teachers-item`}>
									<h2>
										{item?.firstName}
										{item?.lastName}
									</h2>
								</li>
							);
						}
					})}
				</ul>
			</div>
			<Link to={'/admin/teacher-create'} className='add-button'>
				+ Add Teacher
			</Link>
		</TeachersStyled>
	);
};

export default Teachers;
