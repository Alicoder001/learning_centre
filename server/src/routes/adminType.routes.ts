import express from 'express';
import { addAdminType } from '../controller/adminType.controller';
import { supAdminAuth } from '../middleware';
const adminTypeRouter = express.Router();
adminTypeRouter.post('/add', supAdminAuth, addAdminType);
export default adminTypeRouter;
