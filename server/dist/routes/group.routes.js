"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const group_controller_1 = require("../controller/group.controller");
const adminAuth_1 = __importDefault(require("../middleware/adminAuth"));
const groupRouter = express_1.default.Router();
groupRouter.post('/add', adminAuth_1.default, group_controller_1.addGroup);
groupRouter.get('/all', adminAuth_1.default, group_controller_1.getGroups);
exports.default = groupRouter;
