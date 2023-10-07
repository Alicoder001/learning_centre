import express from 'express';
import {
	adminRouter,
	adminTypeRouter,
	dayPartRouter,
	groupRouter,
	groupTypeRouter,
	lessonRouter,
	roomRouter,
	scienceRouter,
	studentRouter,
	teacherRouter,
	teacherTypeRouter,
} from '../';
import adminAuth from '../../middleware/adminAuth';
const VAdminRouter = express.Router();
VAdminRouter.use('/admin', adminRouter);
VAdminRouter.use('/student', studentRouter);
VAdminRouter.use('/teacher', teacherRouter);
VAdminRouter.use('/teacherType', teacherTypeRouter);
VAdminRouter.use('/adminType', adminTypeRouter);
VAdminRouter.use('/dayPart', adminAuth, dayPartRouter);
VAdminRouter.use('/science', adminAuth, scienceRouter);
VAdminRouter.use('/groupType', adminAuth, groupTypeRouter);
VAdminRouter.use('/group', adminAuth, groupRouter);
VAdminRouter.use('/lesson', lessonRouter);
VAdminRouter.use('/room', roomRouter);
export default VAdminRouter;
