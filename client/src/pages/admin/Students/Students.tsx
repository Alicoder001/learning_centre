import React, { useEffect } from 'react';

import { adminFailure, adminStart, groupsSucces, studentsSucces, teachereSucces } from '../../../redux/slice/adminSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/intex';
import { useDispatch } from 'react-redux';
import axios from '../../../service/api';
import { Link } from 'react-router-dom';
import { StudentStyled } from './Students.styled';
const Students = () => {
	const { students } = useSelector((state: RootState) => state.admin);
	const { controlType, link, totalFinished } = useSelector((state: RootState) => state.total);
	const dispatch = useDispatch();
	const getStudents = async () => {
		dispatch(adminStart());
		try {
			const response = await axios.get(`${controlType ? link : ''}student/all`);
			dispatch(studentsSucces(response?.data));
		} catch (error) {
			dispatch(adminFailure(error));
		}
	};
	useEffect(() => {
		if (totalFinished) {
			getStudents();
		}
	}, [totalFinished]);
	return (
		<StudentStyled>
			<div className='students'>
				<h1 className='students-title'>Faol O'quvchilar</h1>
				<ul className='students-list'>
					{students.map((item: any) => {
						if(item?.group?.isActive){
							return (
								<li key={item?.id} className={`students-item`}>
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
			<div className='students'>
				<h1 className='students-title'>No Faol O'quvchilar</h1>
				<ul className='students-list'>
					{students.map((item: any) => {
						if (!item?.group?.isActive) {
							return (
								<li key={item?.id} className={`students-item`}>
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

			<Link to={'/admin/student-create'} className='add-button'>
				+ Add Student
			</Link>
		</StudentStyled>
	);
};

export default Students;
