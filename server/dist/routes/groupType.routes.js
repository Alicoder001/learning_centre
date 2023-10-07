"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../db/prisma"));
const middleware_1 = require("../middleware");
const grouptTypeRouter = express_1.default.Router();
grouptTypeRouter.post('/add', middleware_1.supAdminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, totalDuration, scienseId } = req.body;
        const response = yield prisma_1.default.groupType.create({
            data: {
                name,
                price,
                totalDuration,
                scienseId: +scienseId,
            },
        });
        if (!response) {
            res.status(404).json({ error: "Groupt type qo'shilmadi!" });
        }
        res.status(200).json({ message: "Groupt type qo'shildi" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
}));
exports.default = grouptTypeRouter;
