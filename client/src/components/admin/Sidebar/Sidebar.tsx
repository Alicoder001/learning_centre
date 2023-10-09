import React, { useEffect, useState } from 'react';
import { SidebarStyled } from './Sidebar.styled';
import { FaHome, FaChalkboardTeacher } from 'react-icons/fa';
import { MdGroups2 } from 'react-icons/md';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import { SiSimpleanalytics } from 'react-icons/si';
import { PiStudentFill } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/intex';
interface adminProps {
	isShowSidebar: Boolean;
	setShowSidebar: Function;
}

const menuList = [
	{
		link: '',
		name: 'Dashboard',
		img: FaHome,
	},
	// {
	// 	link: 'transaction',
	// 	name: 'Tranzaksiya',
	// 	img: GrTransaction,
	// },
	// {
	// 	link: 'analystic',
	// 	name: 'Analatika',
	// 	img: SiSimpleanalytics,
	// },
	{
		link: 'teachers',
		name: "O'qituvchilar",
		img: FaChalkboardTeacher,
	},
	{
		link: 'students',
		name: "O'quvchilar",
		img: PiStudentFill,
	},
	{
		link: 'groups',
		name: 'Guruhlar',
		img: MdGroups2,
	},
];
const Sidebar = (props: adminProps) => {
	const [page, setPage] = useState('');
	const { isShowSidebar, setShowSidebar } = props;
	const { isDark } = useSelector((state: RootState) => state.total);
	const location = useLocation();
	useEffect(() => {
		setPage(location?.pathname?.split('/').at(-1) || ('' as string));
	}, [location]);

	return (
		<SidebarStyled>
			<div className={`sidebar ${!isShowSidebar && 'close'}`}>
				<header>
					<h1>NAJOTPLUS</h1>
					<div
						className='back'
						onClick={(e) => {
							setShowSidebar(false);
						}}>
						<MdOutlineArrowBackIos color={`${isDark ? 'white' : 'black'}`} size={20} />
					</div>

					<div
						className='toggle'
						onClick={(e) => {
							setShowSidebar(true);
						}}>
						<GiHamburgerMenu size={30} />
					</div>
				</header>
				<ul className='sidebar-list'>
					{menuList.map((item) => {
						return (
							<Link
								to={`${item.link}`}
								onClick={() => {
									setPage(item.link);
								}}
								key={item.link}
								className={`sidebar-item ${page === 'admin' && item.link === '' ? 'active' : page === item.link ? 'active' : ''}`}>
								<div className='sidebar-item__wrap'>
									<div className='sidebar-item__iconWrap'>
										<item.img
											className='icon'
											size={24}
											color={
												isDark ? `${page === item.link ? '#4318FF' : 'white'}` : `${page === item.link ? '#4318FF' : 'black'}`
											}
										/>
									</div>
									<h3 className='sidebar-item__title'>{item.name}</h3>
								</div>
								<hr className='sidebar-item__line' />
							</Link>
						);
					})}
				</ul>
			</div>
		</SidebarStyled>
	);
};

export default Sidebar;
