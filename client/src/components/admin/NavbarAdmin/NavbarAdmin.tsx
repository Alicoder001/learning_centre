import React from 'react';
import { infoIconLight, moonLight, notificationLight, searchIconLight, userImg } from '../../../images';
import { NavbarAdminStyled } from './NavbarAdmin.styled';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../../../redux/slice/userSlice';
interface adminProps {
	isShowSidebar: Boolean;
	setShowSidebar: Function;
}
const NavbarAdmin = (props: adminProps) => {
	const { setShowSidebar } = props;
	const dispatch = useDispatch();
	return (
		<NavbarAdminStyled className='admin-navbar'>
			<div className='container'>
				<div className='left-wrapper'>
					<GiHamburgerMenu
						onClick={() => {
							setShowSidebar(true);
						}}
						className='toggle'
						size={30}
					/>
					<div className='left-wrapper__page'>
						<p className='left-wrapper__page-path'>Pages / dashboard</p>
						<h1 className='left-wrapper__page-name'>Dashboard</h1>
					</div>
				</div>
				<div className='right-wrapper'>
					<div className='right-wrapper__search'>
						<img src={searchIconLight} alt='' className='right-wrapper__searchIcon' />
						<input type='text' className='right-wrapper__input' placeholder='Search' />
					</div>
					<div className='right-wrapper__notification'>
						<img src={notificationLight} className='right-wrapper__notificationIcon' alt='notification' />
					</div>
					<div className='right-wrapper__mode'>
						<img src={moonLight} className='right-wrapper__modeIcon' alt='moon' />
					</div>
					<div className='right-wrapper__info'>
						<img src={infoIconLight} alt='info' />
					</div>
					<div className='right-wrapper__profile'>
						<img src={userImg} alt='profile img' />
						<div className='profile-info'>
							<ul>
								<li>
									<img src='' alt='' />
									<p>Profile</p>
								</li>
								<li>
									<img src='' alt='' />
									<p>Sozlamalar</p>
								</li>
								<li
									onClick={() => {
										dispatch(userLogOut());
									}}>
									<img src='' alt='' />
									<p>Chiqish</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</NavbarAdminStyled>
	);
};

export default NavbarAdmin;
