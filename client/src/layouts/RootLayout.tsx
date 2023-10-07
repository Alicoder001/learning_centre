import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store/intex';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { userSignFailure, userSignSucces } from '../redux/slice/userSlice';

const RootLayout = () => {
	const dispatch = useDispatch();
	const { controlType, link } = useSelector((state: RootState) => state.total);
	const navigate = useNavigate();
	const { isLoggedIn, userType, userFinished } = useSelector((state: RootState) => state.user);
	
	const getUser = async () => {
		const user = JSON.parse(localStorage.getItem('userInfo') as any);
		console.log(user);
		if (user?.token) {
			try {
				const userInfo = await axios.get(
					`http://localhost:3000/api/${controlType ? link : ''}${user?.userType ? user?.userType + '/' : ''}getUser`,
					{
						headers: {
							Authorization: `Bearer ${user?.token}`,
						},
					},
				);
				dispatch(userSignSucces({ response: userInfo?.data }));
			} catch (error) {
				console.log(error);
				dispatch(userSignFailure(error));
			}
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	return <Outlet />;
};

export default RootLayout;
