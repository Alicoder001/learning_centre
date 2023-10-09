import React, { useEffect } from 'react';
import { HomeStyled } from './Home.styled';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store/intex';
import { useSelector } from 'react-redux';

const Home = () => {
	const navigate = useNavigate();
	const { isLoggedIn, userType, userFinished } = useSelector((state: RootState) => state.user);
	const { controlType } = useSelector((state: RootState) => state.total);
	useEffect(() => {
		console.log(userType);
		if (isLoggedIn && userFinished) {
			navigate(`/${userType}`);
		} else if (!isLoggedIn && !controlType) {
			navigate('/login/admin');
		} else if (isLoggedIn && controlType) {
			navigate('/plan');
		}
	}, [isLoggedIn, userFinished, controlType]);
	return (
		<HomeStyled>
			<div className='plan'>
				<div className='container'>
					<h1 className='plan-title'>Kirish</h1>
					<ul className='plan-list'>
						<Link
							to={'/login/admin'}
							// onClick={() => {
							// 	handleClick(item.id);
							// }}

							className='plan-item'>
							<h1 className='plan-item__title'>Men Adminman</h1>
						</Link>
						<Link
							to={'/login/teacher'}
							// onClick={() => {
							// 	handleClick(item.id);
							// }}

							className='plan-item'>
							<h1 className='plan-item__title'>Men O'qituvchiman</h1>
						</Link>
						<Link
							to={'/login/student'}
							// onClick={() => {
							// 	handleClick(item.id);
							// }}

							className='plan-item'>
							<h1 className='plan-item__title'>Men O'quvchiman</h1>
						</Link>
					</ul>
				</div>
			</div>
		</HomeStyled>
	);
};

export default Home;
