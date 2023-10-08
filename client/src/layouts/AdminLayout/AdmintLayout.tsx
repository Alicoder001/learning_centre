import React, { useEffect, useState } from 'react';
import { Outlet, Route, useNavigate } from 'react-router-dom';
import Login from '../../components/Login/Login';
import NavbarAdmin from '../../components/admin/NavbarAdmin/NavbarAdmin';
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import { AdminLayoutStyled } from './AdminLayoutStyled';
import { RootState } from '../../redux/store/intex';
import { useSelector } from 'react-redux';

const AdmintLayout = () => {
	const navigate = useNavigate();
	const [isShowSidebar, setShowSidebar] = useState(false);
	const { isLoggedIn, userType, userFinished } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		if (!isLoggedIn && userFinished) {
			navigate('/');
		}
	}, [isLoggedIn, userFinished]);
	return (
		<AdminLayoutStyled className='admin-layout'>
			{isLoggedIn && (
				<>
					<Sidebar isShowSidebar={isShowSidebar} setShowSidebar={setShowSidebar} />
					<div className='wrapper'>
						<NavbarAdmin isShowSidebar={isShowSidebar} setShowSidebar={setShowSidebar} />
						<main>
							<Outlet />
						</main>
					</div>
				</>
			)}
		</AdminLayoutStyled>
	);
};

export default AdmintLayout;
