import React from 'react';
import { HomeStyled } from './Home.styled';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<HomeStyled>
			<div className='plan'>
				<div className='container'>
					<h1 className='plan-title'>Kirish</h1>
					<ul className='plan-list'>
						<Link to={"/login/admin"}
							// onClick={() => {
							// 	handleClick(item.id);
							// }}

							className='plan-item'>
							<h1 className='plan-item__title'>Men Adminman</h1>
						</Link>
						<Link to={"/login/teacher"}
							// onClick={() => {
							// 	handleClick(item.id);
							// }}

							className='plan-item'>
							<h1 className='plan-item__title'>Men O'qituvchiman</h1>
						</Link>
						<Link to={"/login/student"}
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
