import express from 'express';
import { adminRouter, adminTypeRouter, studentRouter, teacherRouter } from '../';
const VAdminRouter = express.Router();
VAdminRouter.use('/admin', adminRouter);
VAdminRouter.use('/student', studentRouter);
VAdminRouter.use('/teacher', teacherRouter);
VAdminRouter.use('/adminType', adminTypeRouter);
export default VAdminRouter;
