import React from 'react'
import { StudentStyled } from './Students.styled'

const Students = () => {
  return (
		<StudentStyled>
			<div className='students'>
				<h1 className='students-title'>O'quvchilar</h1>
				<ul className='students-list'>
					<li className={`students-item`}>tranzaksiya</li>
					<li className={`students-item`}>tranzaksiya</li>
					<li className={`students-item`}>tranzaksiya</li>
				</ul>
			</div>
		</StudentStyled>
  );
}

export default Students