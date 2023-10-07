import express from 'express';
import { addAdmin, adminLogin, adminRegister, getAdmin, getAdmins } from '../controller/admin.controller';
import { getAdminAuth, supAdminAuth } from '../middleware';
const adminRouter = express.Router();
adminRouter.post('/register', adminRegister);
adminRouter.post('/login', adminLogin);
adminRouter.post('/add', supAdminAuth, addAdmin);
adminRouter.get('/getUser',  getAdmin);
adminRouter.get('/all', supAdminAuth, getAdmins);
export default adminRouter;
