"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controller/student.controller");
const studentRouter = express_1.default.Router();
studentRouter.post('/add', student_controller_1.addStudent);
studentRouter.post('/register', student_controller_1.studentRegister);
studentRouter.post('/login', student_controller_1.studentLogin);
studentRouter.get('/all', student_controller_1.getStudents);
studentRouter.get('/groupId/:groupId', student_controller_1.getStudentByGroup);
studentRouter.get('/:id', student_controller_1.getStudent);
exports.default = studentRouter;
