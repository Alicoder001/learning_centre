"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("../");
const VAdminRouter = express_1.default.Router();
VAdminRouter.use('/admin', __1.adminRouter);
VAdminRouter.use('/student', __1.studentRouter);
VAdminRouter.use('/teacher', __1.teacherRouter);
VAdminRouter.use('/adminType', __1.adminTypeRouter);
exports.default = VAdminRouter;
