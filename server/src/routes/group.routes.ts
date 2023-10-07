import express from 'express';
import { addGroup } from '../controller/group.controller';
import adminAuth from '../middleware/adminAuth';

const groupRouter = express.Router();
groupRouter.post('/add', adminAuth, addGroup);

export default groupRouter;
