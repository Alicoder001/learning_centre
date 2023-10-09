import React, { useEffect, useState } from 'react';
import { LoginStyled } from './Login.styled';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { backIconLight, eyesDark, logoLogin, moonLoginLight } from '../../images';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/intex';
import { userLogin } from '../../service/user';
import { useDispatch } from 'react-redux';
import { setMode } from '../../redux/slice/totalSlice';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { type } = useParams();
	const dispatch = useDispatch();
	const { link } = useSelector((state: RootState) => state.total);
	const { isLoggedIn, userType } = useSelector((state: RootState) => state.user);
	const { isDark } = useSelector((state: RootState) => state.total);
	const typeList = [
		{ id: 1, type: 'admin' },
		{ id: 2, type: 'teacher' },
		{ id: 3, type: 'student' },
	];

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		userLogin(dispatch, { email, password }, link, type as string);
	};
	useEffect(() => {
		if (isLoggedIn) {
			navigate(`/${userType}`);
		}
	}, [isLoggedIn]);
	if (typeList.find((item) => item.type === type)) {
		return (
			<LoginStyled>
				<div className='login-wrapper left-wrap'>
					<div className='login-container left-container'>
						<div className='left-wrap__back '>
							<img src={backIconLight} alt='back to home' />
							<Link className='left-wrap__link' to={'/'}>
								Asosiy Menuga qaytish
							</Link>
						</div>
						<form className='form' action=''>
							<h1 className='form-title'>Kirish {type}</h1>
							<p className='form-subt'>Email va parolingizni kiriting!</p>
							<label className='form-label'>
								<span className='form-span'>Email*</span>
								<input
									onChange={(e) => {
										setEmail(e.target.value);
									}}
									className='form-input email-input'
									type='email'
									placeholder='mail@simmmple.com'
								/>
							</label>
							<label className='form-label'>
								<span className='form-span'>Password*</span>
								<div className='input-wrap'>
									<input
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										className='form-input'
										type='form-password'
										placeholder='Min. 8 characters'
									/>
									<img src={eyesDark} alt='' />
								</div>
							</label>
							<button className='form-btn' onClick={handleClick}>
								Kirish
							</button>
							<p className='form-create__subt'>
								Not registered yet? <Link to={'/register'}>Create an Account</Link>
							</p>
						</form>
					</div>
				</div>
				<div className='login-wrapper right-wrapper'>
					<div className='login-container right-container'>
						<img className='login-wrapper__logo' src={logoLogin} alt='' />
						<h2 className='login-wrapper__logo-name'>Najot Plus</h2>
						<div className='login-wrapper__box'>
							<span>Najot Plus o'quv markazi</span>
							<p className='login-wrapper__box-subt'>{type} uchun</p>
						</div>
						<div className='login-wrapper__mode'>
							<img
								onClick={() => {
									setMode(isDark);
									console.log(isDark);
								}}
								src={moonLoginLight}
								alt=''
							/>
						</div>
					</div>
				</div>
			</LoginStyled>
		);
	} else {
		return <h1>😔</h1>;
	}
};

export default Login;
