import React, { useEffect, useState } from 'react';
import { Outlet, Route, useNavigate } from 'react-router-dom';
import Login from '../../components/Login/Login';
import NavbarAdmin from '../../components/admin/NavbarAdmin/NavbarAdmin';
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import { AdminLayoutStyled } from './AdminLayoutStyled';
import { AppDispatch, RootState } from '../../redux/store/intex';
import { useSelector } from 'react-redux';
import { adminFailure, adminStart, adminSucces } from '../../redux/slice/adminSlice';
import axios from '../../service/api';
import { useDispatch } from 'react-redux';
const AdmintLayout = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const [isShowSidebar, setShowSidebar] = useState(false);
	const { isLoggedIn, userType, userFinished } = useSelector((state: RootState) => state.user);
	const {link} = useSelector((state: RootState) => state.total);
	async function getAdminTotal() {
		dispatch(adminStart());
		try {
			const response = await axios.get(`${link ? link + '/' : ''}${userType}/total`);
			dispatch(adminSucces(response?.data));
		} catch (error) {
			dispatch(adminFailure(error));
		}
	}
	
	useEffect(() => {
		if (!isLoggedIn && userFinished) {
			navigate('/');
		} else if (isLoggedIn && userFinished) {
			navigate(`/${userType}`);
			getAdminTotal()
		}
	}, [isLoggedIn, userFinished, userType]);
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
