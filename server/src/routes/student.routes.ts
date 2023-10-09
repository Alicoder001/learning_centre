import express from 'express';
import { addStudent, getStudent, getStudentByGroup, getStudents, studentLogin, studentRegister } from '../controller/student.controller';
import adminAuth from '../middleware/adminAuth';
const studentRouter = express.Router();
studentRouter.post('/add', adminAuth, addStudent);
studentRouter.post('/register', studentRegister);
studentRouter.post('/login', studentLogin);
studentRouter.get('/all', adminAuth, getStudents);
studentRouter.get('/groupId/:groupId', adminAuth, getStudentByGroup);
studentRouter.get('/getUser', getStudent);
export default studentRouter;
