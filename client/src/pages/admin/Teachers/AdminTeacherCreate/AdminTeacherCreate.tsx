import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { AdminTeacherCreateStyled } from './AdminTeacherCreate.Styled';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/intex';
import axios from '../../../../service/api';
import { useDispatch } from 'react-redux';
import { adminFailure, adminStart, adminSucces, groupCreateSlice, groupsSucces, teacherCreateSlice } from '../../../../redux/slice/adminSlice';
const AdminTeacherCreate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { link, userTypes, teacherTypes, groups } = useSelector((state: RootState) => state.total);
	const { message, error } = useSelector((state: RootState) => state.admin);
	const [state, setState] = useState({
		firstName: null,
		lastName: null,
		userName: null,
		email: null,
		password: null,
		phone: null,
		typeId: null,
		groupId: null,
		userTypeId: 2,
	});

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		console.log(state);
		dispatch(adminStart());

		try {
			const response = await axios.post(`${link ? link : ''}teacher/add`, state);
			dispatch(teacherCreateSlice(response.data));
			document.body.querySelector('form')?.reset();
		} catch (error: any) {
			console.log(error?.response?.data?.error);
			dispatch(adminFailure(error?.response?.data?.error));
		}
	};

	return (
		<AdminTeacherCreateStyled>
			<form onSubmit={handleSubmit as any} className='form' action=''>
				<h1 className='form-title'>Guruh qo'shish </h1>
				<p className='form-subt'>Quyidagi qismlarni to'ldiring!</p>
				{message && <p className='message'>{message}</p>}
				{error && <p className='error'>{error}</p>}
				<div className='form-wrap'>
					<label className='form-label'>
						<span className='form-span'>Ism*</span>
						<input
							onChange={(e) => {
								setState((prev: any) => {
									return { ...prev, firstName: e.target.value ? e.target.value : null };
								});
							}}
							className='form-input email-input'
							type='text'
							placeholder='Ism'
							required
						/>
					</label>
					<label className='form-label'>
						<span className='form-span'>Familiya*</span>
						<input
							onChange={(e) => {
								setState((prev: any) => {
									return { ...prev, lastName: e.target.value ? e.target.value : null };
								});
							}}
							className='form-input email-input'
							type='text'
							placeholder='Familiya'
							required
						/>
					</label>
				</div>
				<div className='form-wrap'>
					<label className='form-label'>
						<span className='form-span'>UserName*</span>
						<input
							onChange={(e) => {
								setState((prev: any) => {
									return { ...prev, userName: e.target.value ? e.target.value : null };
								});
							}}
							className='form-input email-input'
							type='text'
							placeholder='UserName'
						/>
					</label>
					<label className='form-label'>
						<span className='form-span'>Email*</span>
						<input
							onChange={(e) => {
								setState((prev: any) => {
									return { ...prev, email: e.target.value ? e.target.value : null };
								});
							}}
							className='form-input email-input'
							type='email'
							placeholder='Email'
						/>
					</label>
				</div>
				<div className='form-wrap'>
					<label className='form-label'>
						<span className='form-span'>Phone*</span>
						<input
							onChange={(e) => {
								setState((prev: any) => {
									return { ...prev, phone: e.target.value ? e.target.value : null };
								});
							}}
							className='form-input email-input'
							type='text'
							placeholder='Tel'
						/>
					</label>
					<label className='form-label'>
						<span className='form-span'>Parol*</span>
						<input
							onChange={(e) => {
								setState((prev: any) => {
									return { ...prev, password: e.target.value ? e.target.value : null };
								});
							}}
							className='form-input email-input'
							type='Password'
							placeholder='Parol'
							required
						/>
					</label>
				</div>
				<div className='form-wrap'>
					<label className='form-label'>
						<span className='form-span'>Guruhlar*</span>
						<div className='input-wrap'>
							<select
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, groupId: e.target.value ? +e.target.value : null };
									});
								}}
								name=''
								id=''>
								<option value={''}>Guruhni tanlang</option>
								{groups.map((item: any) => {
									return (
										<option key={item.id} value={item.id}>
											{item?.name}
										</option>
									);
								})}
							</select>
						</div>
					</label>
					<label className='form-label'>
						<span className='form-span'>TeacherType*</span>
						<div className='input-wrap'>
							<select
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, typeId: e.target.value ? +e.target.value : null };
									});
								}}
								name=''
								id=''>
								<option value={''}>Teacher Type </option>
								{teacherTypes.map((item: any) => {
									return (
										<option key={item.id} value={item.id}>
											{item?.name}
										</option>
									);
								})}
							</select>
						</div>
					</label>
				</div>

				<button className='form-btn'>Kirish</button>
			</form>
		</AdminTeacherCreateStyled>
	);
};

export default AdminTeacherCreate;
