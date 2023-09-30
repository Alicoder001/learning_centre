"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTypeRouter = exports.teacherRouter = exports.studentRouter = exports.adminRouter = void 0;
var admin_routes_1 = require("./admin.routes");
Object.defineProperty(exports, "adminRouter", { enumerable: true, get: function () { return __importDefault(admin_routes_1).default; } });
var student_routes_1 = require("./student.routes");
Object.defineProperty(exports, "studentRouter", { enumerable: true, get: function () { return __importDefault(student_routes_1).default; } });
var teacher_routes_1 = require("./teacher.routes");
Object.defineProperty(exports, "teacherRouter", { enumerable: true, get: function () { return __importDefault(teacher_routes_1).default; } });
var adminType_routes_1 = require("./adminType.routes");
Object.defineProperty(exports, "adminTypeRouter", { enumerable: true, get: function () { return __importDefault(adminType_routes_1).default; } });
