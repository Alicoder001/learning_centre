"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminType_controller_1 = require("../controller/adminType.controller");
const adminTypeRouter = express_1.default.Router();
adminTypeRouter.post('/add', adminType_controller_1.addAdminType);
exports.default = adminTypeRouter;
