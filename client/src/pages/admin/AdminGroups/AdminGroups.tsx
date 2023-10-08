import React, { Fragment, useEffect } from 'react';
import { AdminGroupStyled } from './AdminGroups.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/intex';
import { useDispatch } from 'react-redux';
import { adminFailure, adminStart, groupsSucces } from '../../../redux/slice/adminSlice';
import axios from '../../../service/api';
import { spawn } from 'child_process';
import { Link } from 'react-router-dom';

const AdminGroups = () => {
	const { groups }: any = useSelector((state: RootState) => state.admin);

	const { controlType, link, totalFinished } = useSelector((state: RootState) => state.total);
	const dispatch = useDispatch();
	const getGroups = async () => {
		dispatch(adminStart());
		try {
			const response = await axios.get(`${controlType ? link : ''}group/all`);
			dispatch(groupsSucces(response.data));
		} catch (error) {
			dispatch(adminFailure(error));
		}
	};
	useEffect(() => {
		if (totalFinished) {
			getGroups();
		}
	}, [totalFinished]);
	return (
		<AdminGroupStyled>
			<div className='modal'>
				<form className='form' action=''>
					<h1 className='form-title'>Kirish </h1>
					<p className='form-subt'>Email va parolingizni kiriting!</p>
					<label className='form-label'>
						<span className='form-span'>Email*</span>
						<input
							// onChange={(e) => {
							// 	setEmail(e.target.value);
							// }}
							className='form-input email-input'
							type='email'
							placeholder='mail@simmmple.com'
						/>
					</label>
					<label className='form-label'>
						<span className='form-span'>Password*</span>
						<div className='input-wrap'>
							<input
								// onChange={(e) => {
								// 	setPassword(e.target.value);
								// }}
								className='form-input'
								type='form-password'
								placeholder='Min. 8 characters'
							/>
							{/* <img src={eyesDark} alt='' /> */}
						</div>
					</label>
					<button className='form-btn'>Kirish</button>
					<p className='form-create__subt'>
						Not registered yet? <Link to={'/register'}>Create an Account</Link>
					</p>
				</form>
			</div>
			<div className='groups'>
				<h1 className='groups-title'>Guruhlar</h1>
				<ul className='groups-list'>
					{groups.map((item: any) => {
						const { name, type, room, GroupTeacher, Student, weekPart, dayPart } = item;
						return (
							<li key={item.id} className={`groups-item ${!item.isActive && 'not-active'}`}>
								<h1>{name}</h1>
								<p>{type?.name}</p>
								<p className='groups-item__teacher'>
									{GroupTeacher?.length > 0 ? (
										GroupTeacher?.map((i: any) => {
											return (
												<Fragment key={Math.random() as any}>
													<span>
														{i?.teacher?.firstName} {i?.teacher?.lastName}
													</span>
												</Fragment>
											);
										})
									) : (
										<span style={{ color: 'red' }}>O'qituvchi biriktirilmagan</span>
									)}
								</p>
								<p>{Student.length + ' '} ta o'quvchi</p>
								{item?.isActive ? (
									<>
										<p>{weekPart?.name}</p>
										<p>{dayPart?.part}</p>
									</>
								) : (
									<p style={{ color: 'red' }}>Aktivlashtirilmagan</p>
								)}
							</li>
						);
					})}
				</ul>
			</div>
			<Link to={'/admin/group-create'} className='add-button'>
				+ Add Group
			</Link>
		</AdminGroupStyled>
	);
};

export default AdminGroups;
