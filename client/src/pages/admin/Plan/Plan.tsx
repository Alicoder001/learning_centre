import React from 'react';
import PlanStyled from './Plan.styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/intex';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateTotalFailure, updateTotalStart, updateTotalSucces } from '../../../redux/slice/totalSlice';

const Plan = () => {
	const { controlTypes, totalId }: any = useSelector((state: RootState) => state.total);
	console.log(controlTypes);
	const dispatch = useDispatch();
	const handleClick = async (typeId: number | null) => {
		dispatch(updateTotalStart());
		try {
			const response = await axios.patch(`http://localhost:3000/api/info/update/id/${totalId}`, { typeId });
			dispatch(updateTotalSucces(response.data));
		} catch (error) {
			dispatch(updateTotalFailure(error));
		}
	};
	return (
		<PlanStyled className='plan'>
			<div className='container'>
				<h1 className='plan-title'>Boshqaruv shaklini tanlang!</h1>
				<ul className='plan-list'>
					{controlTypes?.map((item: any) => {
						return (
							<li
								onClick={() => {
									handleClick(item.id);
								}}
								key={item.id}
								className='plan-item'>
								<h1 className='plan-item__title'>{item.title}</h1>
							</li>
						);
					})}
				</ul>
			</div>
		</PlanStyled>
	);
};

export default Plan;
