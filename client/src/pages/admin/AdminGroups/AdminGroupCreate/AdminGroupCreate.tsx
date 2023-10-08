import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { AdminGroupCreateStyled } from './AdminGroupCreate.Styled';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/intex';
import axios from '../../../../service/api';
import { useDispatch } from 'react-redux';
import { adminFailure, adminStart, adminSucces, groupCreateSlice, groupsSucces } from '../../../../redux/slice/adminSlice';
const AdminGroupCreate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { dayPart, weekPart, teacherName, groupType, rooms, link }: any = useSelector((state: RootState) => state.total);
	const { message, error, groupCreated } = useSelector((state: RootState) => state.admin);
	const [state, setState] = useState({
		name: '',
		isActive: false,
		beginnedTime: null,
		dayPartId: null,
		weekPartId: null,
		teacherId: null,
		typeId: null,
		roomId: null,
	});

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		console.log(state);
		dispatch(adminStart());

		try {
			const response = await axios.post(`${link ? link : ''}group/add`, state);
			dispatch(groupCreateSlice(response.data));
			document.body.querySelector('form')?.reset();
		} catch (error: any) {
			console.log(error?.response?.data?.error);
			dispatch(adminFailure(error?.response?.data?.error));
		}
	};

	return (
		<AdminGroupCreateStyled>
			<form onSubmit={handleSubmit as any} className='form' action=''>
				<h1 className='form-title'>Guruh qo'shish </h1>
				<p className='form-subt'>Quyidagi qismlarni to'ldiring!</p>
				{message && <p className='message'>{message}</p>}
				{error && <p className='error'>{error}</p>}
				<div className='form-wrap'>
					<label className='form-label'>
						<span className='form-span'>Guruh nomi*</span>
						<input
							onChange={(e) => {
								setState((prev: any) => {
									return { ...prev, name: e.target.value ? e.target.value : null };
								});
							}}
							className='form-input email-input'
							type='text'
							placeholder='Fp1'
							required
						/>
					</label>
					<label className='form-label'>
						<span className='form-span'>Boshlanish vaqti*</span>
						<input
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setState((prev: any) => {
									return { ...prev, beginnedTime: e.target.value + ':00.000Z' };
								});
							}}
							className='form-input email-input'
							type='datetime-local'
						/>
					</label>
				</div>
				<div className='form-wrap'>
					<label className='form-label'>
						<span className='form-span'>Yo'nalish*</span>
						<div className='input-wrap'>
							<select
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, typeId: e.target.value ? +e.target.value : null };
									});
								}}
								name=''
								id=''>
								<option value={''}>Yo'nalishni tanlang</option>
								{groupType.map((item: any) => {
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
						<span className='form-span'>O'qituvchi*</span>
						<div className='input-wrap'>
							<select
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, teacherId: e.target.value ? +e.target.value : null };
									});
								}}
								name=''
								id=''>
								<option value={''}>O'qituvchi tanlang</option>
								{teacherName.map((item: any) => {
									return (
										<option key={item.id} value={item.id}>
											{item?.firstName + ' '}
											{item?.lastName}
										</option>
									);
								})}
							</select>
						</div>
					</label>
				</div>
				<div className='form-wrap'>
					<label className='form-label'>
						<span className='form-span'>Hafta kunlari*</span>
						<div className='input-wrap'>
							<select
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, weekPartId: e.target.value ? +e.target.value : null };
									});
								}}
								name=''
								id=''>
								<option value={''}>Hafta kunini tanlang </option>
								{weekPart.map((item: any) => {
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
						<span className='form-span'>Dars vaqtlari*</span>
						<div className='input-wrap'>
							<select
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, dayPartId: e.target.value ? +e.target.value : null };
									});
								}}
								name=''
								id=''>
								<option value={''}>Dars vaqtini tanlang</option>
								{dayPart?.map((item: any) => {
									return (
										<option key={item.id} value={item.id}>
											{item?.part}
										</option>
									);
								})}
							</select>
						</div>
					</label>
				</div>

				<div className='form-wrap'>
					<label className='form-label'>
						<span className='form-span'>Xonalar*</span>
						<div className='input-wrap'>
							<select
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, roomId: e.target.value ? +e.target.value : null };
									});
								}}
								name=''
								id=''>
								<option value={''}>Xonani tanlang</option>
								{rooms?.map((item: any) => {
									return (
										<option key={item?.id} value={item.id}>
											{item?.name}
										</option>
									);
								})}
							</select>
						</div>
					</label>
					<label className='form-label'>
						<span className='form-span'>Faolligi*</span>
						<div className='input-wrap'>
							<input
								onChange={(e) => {
									setState((prev: any) => {
										return { ...prev, isActive: e.target.checked };
									});
								}}
								className='form-check'
								type='checkbox'
							/>
						</div>
					</label>
				</div>
				<button className='form-btn'>Kirish</button>
			</form>
		</AdminGroupCreateStyled>
	);
};

export default AdminGroupCreate;
