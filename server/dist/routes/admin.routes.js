"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controller/admin.controller");
const middleware_1 = require("../middleware");
const adminRouter = express_1.default.Router();
adminRouter.post('/register', admin_controller_1.adminRegister);
adminRouter.post('/login', admin_controller_1.adminLogin);
adminRouter.post('/add', middleware_1.supAdminAuth, admin_controller_1.addAdmin);
adminRouter.get('/id/:id', middleware_1.getAdminAuth, admin_controller_1.getAdmin);
adminRouter.get('/all', middleware_1.supAdminAuth, admin_controller_1.getAdmins);
exports.default = adminRouter;
