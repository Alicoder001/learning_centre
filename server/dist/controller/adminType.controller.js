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
exports.removeAdminType = exports.getAdminTypes = exports.addAdminType = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const addAdminType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const data = yield prisma_1.default.adminType.create({
            data: {
                name,
            },
        });
        if (!data) {
            return res.status(500).json({ error: "Ma'lumotlar qo'shilmadi!" });
        }
        res.status(200).json({ message: "Admin type qo'shildi!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
});
exports.addAdminType = addAdminType;
const getAdminTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.getAdminTypes = getAdminTypes;
const removeAdminType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.removeAdminType = removeAdminType;
