"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_controller_1 = require("../controller/teacher.controller");
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const teacherRouter = express_1.default.Router();
teacherRouter.post('/register', teacher_controller_1.teacherRegister);
teacherRouter.post('/login', teacher_controller_1.teacherLogin);
teacherRouter.post('/add', adminAuth_1.default, teacher_controller_1.addTeacher);
teacherRouter.get('/getUser', teacher_controller_1.getTeacher);
teacherRouter.get('/all', teacher_controller_1.getTeachers);
exports.default = teacherRouter;
