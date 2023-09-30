import express from 'express';
import { addTeacher, getTeacher, getTeachers, teacherLogin, teacherRegister } from '../controller/teacher.controller';
const teacherRouter = express.Router();
teacherRouter.post('register', teacherRegister);
teacherRouter.post('login', teacherLogin);
teacherRouter.post('add', addTeacher);
teacherRouter.get('/:id', getTeacher);
teacherRouter.get('/all', getTeachers);
export default teacherRouter;
