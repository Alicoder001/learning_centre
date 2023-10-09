import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/intex';
import axios from '../../../../service/api';
import { useDispatch } from 'react-redux';
import { adminFailure, adminStart, studentCreateSlice } from '../../../../redux/slice/adminSlice';
import { AdminStudentCreateStyled } from './AdminStudentCreate.Styled';
const AdminStudentCreate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { link, groups } = useSelector((state: RootState) => state.total);
	const { message, error } = useSelector((state: RootState) => state.admin);
	const [state, setState] = useState({
		firstName: null,
		lastName: null,
		userName: null,
		email: null,
		password: null,
		phone: null,
		studentId: null,
		groupId: null,
		userTypeId: 3,
	});
	console.log(state);
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		console.log(state);
		dispatch(adminStart());
		try {
			const response = await axios.post(`${link ? link : ''}student/add`, state);
			dispatch(studentCreateSlice(response.data));
			document.body.querySelector('form')?.reset();
		} catch (error: any) {
			console.log(error?.response?.data?.error);
			dispatch(adminFailure(error?.response?.data?.error));
		}
	};

	return (
		<AdminStudentCreateStyled>
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
							required
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
						<span className='form-span'>StudentId*</span>
						<input
							onChange={(e) => {
								setState((prev: any) => {
									return { ...prev, studentId: e.target.value ? +e.target.value : null };
								});
							}}
							className='form-input email-input'
							type='number'
							placeholder='StudentId'
						/>
					</label>
					<label className='form-label'>
						<span className='form-span'>Guruh*</span>
						<div className='input-wrap'>
							<select
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, groupId: e.target.value ? +e.target.value : null };
									});
								}}
								name=''
								id=''>
								<option value={''}>Guruh tanlash </option>
								{groups.map((item: any) => {
									return (
										<option key={item?.id} value={item?.id}>
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
		</AdminStudentCreateStyled>
	);
};

export default AdminStudentCreate;
