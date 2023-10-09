import { PropsWithChildren, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store/intex';
import { useDispatch } from 'react-redux';
import axios from '../service/api';
import { userSignFailure, userSignSucces } from '../redux/slice/userSlice';

const RootLayout = () => {
	const dispatch = useDispatch();
	const { controlType, link, totalFinished, defaultLink } = useSelector((state: RootState) => state.total);
	const navigate = useNavigate();
	const { isLoggedIn, userType, userFinished } = useSelector((state: RootState) => state.user);
	useEffect(() => {
		if (!isLoggedIn && userFinished && controlType && totalFinished) {
			navigate('/');
		} else if (isLoggedIn && userFinished && controlType && totalFinished) {
			navigate(`/${userType}`);
		} else if (isLoggedIn && userFinished && !controlType && totalFinished) {
			navigate('/plan');
		}
	}, [isLoggedIn, userFinished, totalFinished, controlType]);
	const getUser = async () => {
		const user = JSON.parse(localStorage.getItem('userInfo') as any);
		console.log(user);
		console.log(`${controlType ? link : ''}${user?.userType ? user?.userType + '/' : ''}getUser`);
		if (user?.token) {
			try {
				const userInfo = await axios.get(`${controlType ? link : ''}${user?.userType ? user?.userType + '/' : ''}getUser`);
				dispatch(userSignSucces({ response: userInfo?.data }));
			} catch (error) {
				console.log(error);
				dispatch(userSignFailure(error));
			}
		}
	};
	useEffect(() => {
		if (totalFinished) {
			getUser();
		}
	}, [link, totalFinished]);

	return <Outlet />;
};

export default RootLayout;
