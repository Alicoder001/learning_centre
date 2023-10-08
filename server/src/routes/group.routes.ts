import express from 'express';
import { addGroup, getGroup, getGroups } from '../controller/group.controller';
import adminAuth from '../middleware/adminAuth';

const groupRouter = express.Router();
groupRouter.post('/add', adminAuth, addGroup);
groupRouter.get('/all', adminAuth, getGroups);

export default groupRouter;
