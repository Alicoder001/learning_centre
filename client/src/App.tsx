import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import RootLayout from './layouts/RootLayout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AdmintLayout from './layouts/AdminLayout/AdmintLayout';
import { Children, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalFailure, getTotalStart, getTotalSucces } from './redux/slice/totalSlice';
import axios from 'axios';
import { RootState } from './redux/store/intex';
import { getTotalInfo } from './service/total';
import Plan from './pages/admin/Plan/Plan';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import AdminTransaction from './pages/admin/AdminTransaction/AdminTransaction';
import AdminGroups from './pages/admin/AdminGroups/AdminGroups';
import Students from './pages/admin/Students/Students';
import Teachers from './pages/admin/Teachers/Teachers';
import Analystics from './pages/admin/Analystics/Analystics';
import AdminGroupCreate from './pages/admin/AdminGroups/AdminGroupCreate/AdminGroupCreate';
import Home from './pages/Home.tsx/Home';
import TeacherLayout from './layouts/TeacherLayout/TeacherLayout';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		getTotalInfo(dispatch);
	}, []);

	const routes = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Home />} />
				<Route path='login/:type' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='admin' element={<AdmintLayout />}>
					<Route index element={<AdminDashboard />} />
					<Route path='transaction' element={<AdminTransaction />} />
					<Route path='analystic' element={<Analystics />} />
					<Route path='teachers' element={<Teachers />} />
					<Route path='students' element={<Students />} />
					<Route path='groups' element={<AdminGroups />} />
					<Route path='group-create' element={<AdminGroupCreate />} />
				</Route>
				<Route path='admin' element={<TeacherLayout />}>
					<Route index element={<AdminDashboard />} />
					<Route path='transaction' element={<AdminTransaction />} />
					<Route path='analystic' element={<Analystics />} />
					<Route path='teachers' element={<Teachers />} />
					<Route path='students' element={<Students />} />
					<Route path='groups' element={<AdminGroups />} />
					<Route path='group-create' element={<AdminGroupCreate />} />
				</Route>
				<Route path='plan' element={<Plan />} />
			</Route>,
		),
	);
	return (
		<div className='App'>
			<RouterProvider router={routes} />
		</div>
	);
}

export default App;
