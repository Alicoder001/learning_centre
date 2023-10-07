import React from 'react';
import { TeachersStyled } from './Teachers.styled';

const Teachers = () => {
	return (
		<TeachersStyled>
			<div className='teachers'>
				<h1 className='teachers-title'>Katta Ustozlar</h1>
				<ul className='teachers-list'>
					<li className={`teachers-item`}>tranzaksiya</li>
					<li className={`teachers-item`}>tranzaksiya</li>
					<li className={`teachers-item`}>tranzaksiya</li>
				</ul>
			</div>
			<div className='teachers'>
				<h1 className='teachers-title'>Yordamchi Ustozlar</h1>
				<ul className='teachers-list'>
					<li className={`teachers-item`}>tranzaksiya</li>
					<li className={`teachers-item`}>tranzaksiya</li>
					<li className={`teachers-item`}>tranzaksiya</li>
				</ul>
			</div>
		</TeachersStyled>
	);
};

export default Teachers;
