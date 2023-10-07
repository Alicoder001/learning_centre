"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controller/student.controller");
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const studentRouter = express_1.default.Router();
studentRouter.post('/add', adminAuth_1.default, student_controller_1.addStudent);
studentRouter.post('/register', student_controller_1.studentRegister);
studentRouter.post('/login', student_controller_1.studentLogin);
studentRouter.get('/all', student_controller_1.getStudents);
studentRouter.get('/groupId/:groupId', adminAuth_1.default, student_controller_1.getStudentByGroup);
studentRouter.get('/getUser', student_controller_1.getStudent);
exports.default = studentRouter;
